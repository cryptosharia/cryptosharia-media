import { getAcademyVisibility, getContentCategories } from '$lib/api';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
    const [result, academyVisibility] = await Promise.all([
        getContentCategories({ sections: ['news', 'education'], limit: 100, page: 1 }),
        getAcademyVisibility()
    ]);

    return { contentCategories: result.data?.data.items ?? [], academyVisibility };
};
