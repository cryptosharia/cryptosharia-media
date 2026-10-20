/** @typedef {{ academyPromotionEnabled: boolean, academyNavbarEnabled: boolean, academyHomepageSectionEnabled: boolean }} AcademyVisibilityValues */

/** @typedef {AcademyVisibilityValues & { effectiveNavbar: boolean, effectiveSection: boolean }} AcademyVisibility */

/** @type {AcademyVisibility} */
export const VERIFIED_ACADEMY_VISIBILITY_DEFAULT = {
  academyPromotionEnabled: true,
  academyNavbarEnabled: true,
  academyHomepageSectionEnabled: true,
  effectiveNavbar: true,
  effectiveSection: true,
};

/** @param {unknown} value @returns {value is AcademyVisibilityValues} */
export function isAcademyVisibility(value) {
  if (!value || typeof value !== "object") return false;
  const settings = /** @type {Record<string, unknown>} */ (value);
  return (
    typeof settings.academyPromotionEnabled === "boolean" &&
    typeof settings.academyNavbarEnabled === "boolean" &&
    typeof settings.academyHomepageSectionEnabled === "boolean"
  );
}

/** @param {AcademyVisibilityValues} values @returns {AcademyVisibility} */
export function calculateAcademyVisibility(values) {
  return {
    ...values,
    effectiveNavbar:
      values.academyPromotionEnabled && values.academyNavbarEnabled,
    effectiveSection:
      values.academyPromotionEnabled && values.academyHomepageSectionEnabled,
  };
}
