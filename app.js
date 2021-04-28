const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const routes = require("./routes/routes");

const app = express();

app.use(routes);

mongoose
  .connect("mongodb+srv://rosko:Rossen91kz@cluster0.qhqg3.mongodb.net/movie-app?retryWrites=true&w=majority", { useNewUrlParser: true,useUnifiedTopology: true }, )
  .then(() => app.listen(5000, console.log("listening on port 5000....")))
  .catch((err) => console.log(err));
