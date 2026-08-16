import { getContentCategories } from '$lib/api';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
    const result = await getContentCategories({
        contentSections: ['news', 'education'],
        showInNavigation: true,
        limit: 100,
        page: 1
    });

    return { contentCategories: result.data?.data.items ?? [] };
};
