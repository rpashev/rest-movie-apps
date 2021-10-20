const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const moviesRoutes = require("./routes/movies-routes");
const authRoutes = require("./routes/auth-routes");
const publicRoutes = require("./routes/public-routes");
const HttpError = require("./models/http-error");
const checkAuth = require("./middleware/checkAuth");

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
app.use("/movies/", moviesRoutes);

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
