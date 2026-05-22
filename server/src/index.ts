import cors from "cors";
import express from "express";
import { config } from "./config.js";
import { leadsRouter } from "./routes/leads.js";

const app = express();

app.use(
  cors({
    origin: config.corsOrigin.split(",").map((origin) => origin.trim()),
    credentials: false
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ success: true, data: { status: "ok" } });
});

app.use("/api/leads", leadsRouter);

app.use((_req, res) => {
  res.status(404).json({ success: false, error: "Not found" });
});

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled server error", error);
  res.status(500).json({ success: false, error: "Server error" });
});

app.listen(config.port, () => {
  console.log(`Seller Rocket API running on http://localhost:${config.port}`);
});

