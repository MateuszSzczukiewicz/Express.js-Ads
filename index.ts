import express, { json, Router } from "express";
import cors from "cors";
import "express-async-errors";
import { handleError } from "./utils/errors";
import rateLimit from "express-rate-limit";
import { adRouter } from "./routers/ad.router";

const app = express();

app.use(
  cors({
    origin: process.env.corsOrigin,
  }),
);
app.use(json());
app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 100,
  }),
);

const router = Router();

router.use("/ad", adRouter);

app.use("/api", router);

app.use(handleError);

app.listen(3001, () => console.log("Listening on port http://localhost:3001"));
