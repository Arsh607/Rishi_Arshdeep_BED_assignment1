import express, { Express } from "express";

const app: Express = express();

app.get("/", (_, res) => {
  res.send("Hello, World!");
});

export default app;

app.get("/api/v1/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

import {
  calculatePortfolioPerformance,
  findLargestHolding,
  assetAllocationPercentage,
  Asset
} from "./portfolio/portfolioPerformance";

app.get("/api/v1/portfolio/performance", (req, res) => {
  // Example values; adapt to accept query params/body as needed
  const result = calculatePortfolioPerformance(10000, 12000);
  res.json(result);
});

app.get("/api/v1/portfolio/largest-holding", (req, res) => {
  const assets: Asset[] = [
    { name: "A", value: 100, type: "stock" },
    { name: "B", value: 300, type: "bond" },
    { name: "C", value: 200, type: "real estate" },
  ];
  res.json(findLargestHolding(assets));
});

app.get("/api/v1/portfolio/allocation", (req, res) => {
  const assets: Asset[] = [
    { name: "A", value: 50, type: "stock" },
    { name: "B", value: 50, type: "bond" },
  ];
  res.json(assetAllocationPercentage(assets));
});
