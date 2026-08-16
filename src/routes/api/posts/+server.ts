import { json } from '@sveltejs/kit';
import { getPosts } from '$lib/api';

export async function GET({ url }) {
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 6;
    
    // Parse array parameters
    const sectionsParam = url.searchParams.get('sections');
    const typesParam = url.searchParams.get('types');
    const excludeParam = url.searchParams.get('exclude');
    const tagsParam = url.searchParams.get('tags');
    const search = url.searchParams.get('search')?.trim();

    let params: any = { page, limit };
    if (sectionsParam) params.sections = sectionsParam.split(',');
    if (typesParam) params.types = typesParam.split(',');
    if (excludeParam) params.exclude = excludeParam.split(',');
    if (tagsParam) params.tags = tagsParam.split(',');
    if (search) params.search = search;

    try {
        const res = await getPosts(params);
        if (res.error) {
            return json(
                { items: [], pagination: { total: 0, page, limit, totalPages: 0 }, error: res.error.message },
                { status: res.response.status || 503 }
            );
        }
        const data = res.data?.data;
        return json({
            items: (data?.items ?? []).map(({ createdBy: _createdBy, updatedBy: _updatedBy, ...post }) => post),
            pagination: data?.pagination ?? { total: 0, page, limit, totalPages: 0 }
        });
    } catch (e) {
        console.error('Failed to fetch posts:', e);
        return json({ items: [], pagination: { total: 0, page, limit, totalPages: 0 } }, { status: 500 });
    }
}
