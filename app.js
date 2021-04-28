const express = require("express");
const bodyParser = require("body-parser");

const routes = require('./routes/routes')

const app = express();

app.use(routes);

app.listen(5000, console.log("listening on port 5000...."))
