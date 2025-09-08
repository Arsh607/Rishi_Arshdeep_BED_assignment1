import { calculatePortfolioPerformance } from "../src/portfolio/portfolioPerformance";

describe("calculatePortfolioPerformance", () => {
  it("reports significant gain at 20%", () => {
    const perf = calculatePortfolioPerformance(1000, 1200);
    expect(perf.performanceSummary).toMatch(/significantly/);
  });
  it("reports no change at 0%", () => {
    const perf = calculatePortfolioPerformance(1000, 1000);
    expect(perf.performanceSummary).toMatch(/No change/);
  });
  it("reports significant loss at -20%", () => {
    const perf = calculatePortfolioPerformance(1000, 800);
    expect(perf.performanceSummary).toMatch(/significantly/);
  });
});
