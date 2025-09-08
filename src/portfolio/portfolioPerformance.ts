// Interface for Portfolio Performance
export interface PortfolioPerformance {
  initialInvestment: number;
  currentValue: number;
  profitOrLoss: number;
  percentageChange: number;
  performanceSummary: string;
}

/**
 * Calculates the performance of a financial portfolio and provides a summary.
 * The summary maps % change to the condition/outcome chart.
 */
export function calculatePortfolioPerformance(
  initialInvestment: number,
  currentValue: number
): PortfolioPerformance {
  const profitOrLoss = currentValue - initialInvestment;
  // Avoid division by zero for calculation
  const percentageChange = initialInvestment === 0
    ? 0
    : (profitOrLoss / initialInvestment) * 100;

  // Decision logic for summary based on provided conditions chart
  const conditions = [
    { cond: (x: number) => x >= 20, summary: "Gained significantly" },
    { cond: (x: number) => x >= 10 && x < 20, summary: "Gained moderately" },
    { cond: (x: number) => x >= 0.1 && x < 10, summary: "Gained slightly" },
    { cond: (x: number) => x === 0, summary: "No change" },
    { cond: (x: number) => x <= -0.1 && x > -10, summary: "Lost slightly" },
    { cond: (x: number) => x <= -10 && x > -20, summary: "Lost moderately" },
    { cond: (x: number) => x <= -20, summary: "Lost significantly" }
  ];

  // Ensure precision matches summary chart
  const pctRounded = Number(percentageChange.toFixed(2));
  const found = conditions.find(c => c.cond(pctRounded));
  const summary = found ? found.summary : "No change";

  return {
    initialInvestment,
    currentValue,
    profitOrLoss,
    percentageChange: pctRounded,
    performanceSummary: `Portfolio ${summary}.`
  };
}

/**
 * Interface for representing an asset.
 */
export interface Asset {
  name: string;
  value: number;
  type: string;
}

/**
 * Returns the asset with the highest value in the array, or null if empty.
 */
export function findLargestHolding(assets: Asset[]): Asset | null {
  // FIX: Initial value must be assets, not assets.
  return assets.length
    ? assets.reduce((max, asset) => asset.value > max.value ? asset : max, assets)
    : null;
}

/**
 * Computes the allocation percentage of each asset type in the portfolio.
 * Returns a record mapping asset type to percent of portfolio.
 */
export function assetAllocationPercentage(assets: Asset[]): Record<string, number> {
  const total = assets.reduce((sum, a) => sum + a.value, 0);
  return assets.reduce((acc, a) => {
    acc[a.type] = (acc[a.type] ?? 0) + (total ? (a.value / total) * 100 : 0);
    return acc;
  }, {} as Record<string, number>);
}
