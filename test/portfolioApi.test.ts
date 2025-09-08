import request from "supertest";
import app from "../src/app";

describe("Portfolio API endpoints", () => {
  it("should return a performance summary", async () => {
    const res = await request(app).get("/api/v1/portfolio/performance");
    expect(res.body).toHaveProperty("performanceSummary");
  });
  it("should return the largest holding", async () => {
    const res = await request(app).get("/api/v1/portfolio/largest-holding");
    expect(res.body).toHaveProperty("name");
  });
  it("should return allocation percentages", async () => {
    const res = await request(app).get("/api/v1/portfolio/allocation");
    expect(res.body).toHaveProperty("stock");
  });
});
