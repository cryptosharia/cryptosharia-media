import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateAcademyVisibility,
  isAcademyVisibility,
  VERIFIED_ACADEMY_VISIBILITY_DEFAULT,
} from "../src/lib/academy-visibility.js";

test("all eight master and child combinations produce the expected public visibility", () => {
  for (const academyPromotionEnabled of [false, true]) {
    for (const academyNavbarEnabled of [false, true]) {
      for (const academyHomepageSectionEnabled of [false, true]) {
        const result = calculateAcademyVisibility({
          academyPromotionEnabled,
          academyNavbarEnabled,
          academyHomepageSectionEnabled,
        });
        assert.equal(
          result.effectiveNavbar,
          academyPromotionEnabled && academyNavbarEnabled,
        );
        assert.equal(
          result.effectiveSection,
          academyPromotionEnabled && academyHomepageSectionEnabled,
        );
        assert.equal(result.academyNavbarEnabled, academyNavbarEnabled);
        assert.equal(
          result.academyHomepageSectionEnabled,
          academyHomepageSectionEnabled,
        );
      }
    }
  }
});

test("only strictly boolean values are accepted and the explicit fallback matches verified production state", () => {
  assert.equal(
    isAcademyVisibility({
      academyPromotionEnabled: true,
      academyNavbarEnabled: false,
      academyHomepageSectionEnabled: true,
    }),
    true,
  );
  assert.equal(
    isAcademyVisibility({
      academyPromotionEnabled: "false",
      academyNavbarEnabled: true,
      academyHomepageSectionEnabled: true,
    }),
    false,
  );
  assert.deepEqual(VERIFIED_ACADEMY_VISIBILITY_DEFAULT, {
    academyPromotionEnabled: true,
    academyNavbarEnabled: true,
    academyHomepageSectionEnabled: true,
    effectiveNavbar: true,
    effectiveSection: true,
  });
});
