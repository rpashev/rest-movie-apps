import "dotenv/config";
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
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.options("*", cors());

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
    `mongodb://${process.env.USER_MONGO}:${process.env.USER_MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}-shard-00-00.cpss2.mongodb.net:27017,${process.env.MONGO_CLUSTER}-shard-00-01.cpss2.mongodb.net:27017,${process.env.MONGO_CLUSTER}-shard-00-02.cpss2.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-dg8hi2-shard-0&authSource=admin&retryWrites=true&w=majority`
  )
  .then(() =>
    app.listen(
      process.env.PORT || 5000,
      console.log("listening on port 5000....")
    )
  )
  .catch((err) => console.log(err));
