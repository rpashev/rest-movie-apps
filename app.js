const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const moviesRoutes = require("./routes/movies-routes");
const authRoutes = require("./routes/auth-routes")

const app = express();

app.use("/movies/", moviesRoutes);
app.use("/auth/", authRoutes);

mongoose
  .connect(
    "mongodb://rosko:Rossen91kz@cluster0-shard-00-00.qhqg3.mongodb.net:27017,cluster0-shard-00-01.qhqg3.mongodb.net:27017,cluster0-shard-00-02.qhqg3.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-u5trjd-shard-0&authSource=admin&retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => app.listen(5000, console.log("listening on port 5000....")))
  .catch((err) => console.log(err));
