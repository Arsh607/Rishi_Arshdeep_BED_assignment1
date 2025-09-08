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