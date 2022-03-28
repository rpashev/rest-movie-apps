import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth-routes.js";
import movieRoutes from "./routes/movie-routes.js";
import userRoutes from "./routes/user-routes.js";
import HttpError from "./models/http-error.js";
import checkAuth from "./middleware/checkAuth.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
