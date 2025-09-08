import { findLargestHolding, assetAllocationPercentage, Asset } from "../src/portfolio/portfolioPerformance";

describe("findLargestHolding", () => {
  it("returns the largest", () => {
    const assets: Asset[] = [
      { name: "A", value: 100, type: "stock" },
      { name: "B", value: 300, type: "bond" },
      { name: "C", value: 200, type: "real estate" },
    ];
    expect(findLargestHolding(assets)?.name).toBe("B");
  });
  it("returns null for empty array", () => {
    expect(findLargestHolding([])).toBeNull();
  });
});

describe("assetAllocationPercentage", () => {
  it("splits allocation evenly", () => {
    const assets: Asset[] = [
      { name: "A", value: 50, type: "stock" },
      { name: "B", value: 50, type: "bond" },
    ];
    const res = assetAllocationPercentage(assets);
    expect(res["stock"]).toBeCloseTo(50);
    expect(res["bond"]).toBeCloseTo(50);
  });
  it("returns 0s on empty array", () => {
    expect(assetAllocationPercentage([])).toEqual({});
  });
});
