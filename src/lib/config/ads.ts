export const AD_PLACEMENTS = {
    'homepage-top': { format: 'leaderboard', enabled: false },
    'homepage-middle': { format: 'billboard', enabled: false },
    'article-sidebar': { format: 'rectangle', enabled: false },
    'article-inline': { format: 'inline', enabled: false, sections: ['news', 'education'] }
} as const;

export type AdPlacement = keyof typeof AD_PLACEMENTS;
