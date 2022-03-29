import express from "express";
import helmet from "helmet";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import hpp from "hpp";

import authRoutes from "./routes/auth-routes.js";
import movieRoutes from "./routes/movie-routes.js";
import userRoutes from "./routes/user-routes.js";
import HttpError from "./models/http-error.js";
import checkAuth from "./middleware/checkAuth.js";

const app = express();

app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10kb" }));

app.use(mongoSanitize());

app.use(hpp()); //against parameter pollution

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100,
});

app.use(limiter);

app.use(
  cors({
    origin: "*",
  })
);

// app.options("*", cors());

app.use("/auth/", authRoutes);

app.use(checkAuth);

app.use(movieRoutes);
app.use(userRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route!", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Uknown error occurred!" });
});

export default app;
