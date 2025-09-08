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

  // Decision array according to assignment_conditions_outcomes.jpg
  const conditions = [
    { cond: (x: number) => x >= 20, summary: "Gained significantly" },
    { cond: (x: number) => x >= 10 && x < 20, summary: "Gained moderately" },
    { cond: (x: number) => x >= 0.1 && x < 10, summary: "Gained slightly" },
    { cond: (x: number) => x === 0, summary: "No change" },
    { cond: (x: number) => x <= -0.1 && x > -10, summary: "Lost slightly" },
    { cond: (x: number) => x <= -10 && x > -20, summary: "Lost moderately" },
    { cond: (x: number) => x <= -20, summary: "Lost significantly" },
  ];
  // Find the first condition that matches, otherwise fallback
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
