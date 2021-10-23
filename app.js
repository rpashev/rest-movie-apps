import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth-routes.js";
import publicRoutes from "./routes/public-routes.js";
import userRoutes from "./routes/user-routes.js";
import HttpError from "./models/http-error.js";
import checkAuth from "./middleware/checkAuth.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:8080",
  })
);

app.use("/auth/", authRoutes);
app.use(publicRoutes);

app.use(checkAuth);
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

mongoose
  .connect(
    "mongodb+srv://rosko_kz:Rossen91kz@cluster0.cpss2.mongodb.net/movie-app?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000, console.log("listening on port 5000....")))
  .catch((err) => console.log(err));
