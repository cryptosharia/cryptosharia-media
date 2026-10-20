export const ACADEMY_VISIBILITY_CONTEXT = 'cryptosharia:academy-visibility';

export type AcademyVisibilityState = {
    academyPromotionEnabled: boolean;
    academyNavbarEnabled: boolean;
    academyHomepageSectionEnabled: boolean;
    effectiveNavbar: boolean;
    effectiveSection: boolean;
};
