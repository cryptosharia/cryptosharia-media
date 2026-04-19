import { json } from '@sveltejs/kit';
import { getPosts } from '$lib/api';

export async function GET({ url }) {
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 6;
    
    // Parse array parameters
    const sectionsParam = url.searchParams.get('sections');
    const typesParam = url.searchParams.get('types');
    const excludeParam = url.searchParams.get('exclude');

    let params: any = { page, limit };
    if (sectionsParam) params.sections = sectionsParam.split(',');
    if (typesParam) params.types = typesParam.split(',');
    if (excludeParam) params.exclude = excludeParam.split(',');

    try {
        const res = await getPosts(params);
        return json(res.data?.data || { items: [], meta: { currentPage: 1, totalPages: 1 } });
    } catch (e) {
        console.error('Failed to fetch posts:', e);
        return json({ items: [], meta: { currentPage: 1, totalPages: 1 } }, { status: 500 });
    }
}
