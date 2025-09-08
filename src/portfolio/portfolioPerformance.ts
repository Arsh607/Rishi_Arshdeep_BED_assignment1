// Interface for Portfolio Performance
export interface PortfolioPerformance {
  initialInvestment: number;
  currentValue: number;
  profitOrLoss: number;
  percentageChange: number;
  performanceSummary: string;
}

export function calculatePortfolioPerformance(
  initialInvestment: number,
  currentValue: number
): PortfolioPerformance {
  const profitOrLoss = currentValue - initialInvestment;
  // Avoid division by zero
  const percentageChange = initialInvestment === 0 ? 0 : (profitOrLoss / initialInvestment) * 100;


  const conditions = [
    { cond: (x: number) => x >= 20, summary: "Gained significantly" },
    { cond: (x: number) => x >= 10 && x < 20, summary: "Gained moderately" },
    { cond: (x: number) => x >= 0.1 && x < 10, summary: "Gained slightly" },
    { cond: (x: number) => x === 0, summary: "No change" },
    { cond: (x: number) => x <= -0.1 && x > -10, summary: "Lost slightly" },
    { cond: (x: number) => x <= -10 && x > -20, summary: "Lost moderately" },
    { cond: (x: number) => x <= -20, summary: "Lost significantly" },
  ];

  const found = conditions.find(c => c.cond(Number(percentageChange.toFixed(2))));
  const summary = found ? found.summary : "No change";

  return {
    initialInvestment,
    currentValue,
    profitOrLoss,
    percentageChange: Number(percentageChange.toFixed(2)),
    performanceSummary: `Portfolio ${summary}.`,
  };
}

export interface Asset {
  name: string;
  value: number;
  type: string; 
}

// Find Largest Holding
export function findLargestHolding(assets: Asset[]): Asset | null {
    return assets.length ? assets.reduce((max, asset) => asset.value > max.value ? asset : max, assets) : null;
}

// Asset Allocation Percentage
export function assetAllocationPercentage(assets: Asset[]): Record<string, number> {
  const total = assets.reduce((sum, a) => sum + a.value, 0);
  return assets.reduce((acc, a) => {
    acc[a.type] = ((acc[a.type] ?? 0) + (total ? (a.value / total) * 100 : 0));
    return acc;
  }, {} as Record<string, number>);
}
