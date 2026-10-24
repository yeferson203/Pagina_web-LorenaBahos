import { describe, expect, it } from "vitest";

import { REAL_REVIEW_COUNT, REVIEWS } from "@/data/reviews";

describe("experience carousel data", () => {
  it("provides editable content and imagery for each carousel item", () => {
    expect(REVIEWS.length).toBeGreaterThan(0);

    for (const review of REVIEWS) {
      expect(review.author).toBeTruthy();
      expect(review.treatment).toBeTruthy();
      expect(review.title).toBeTruthy();
      expect(review.text).toBeTruthy();
      expect(review.image).toBeTruthy();
      expect(review.imageAlt).toBeTruthy();
      expect(typeof review.illustrative).toBe("boolean");
    }
  });

  it("counts only approved non-illustrative reviews as real reviews", () => {
    expect(REAL_REVIEW_COUNT).toBe(REVIEWS.filter((review) => !review.illustrative).length);
  });
});
