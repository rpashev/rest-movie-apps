import "dotenv/config";
import mongoose from "mongoose";

import app from "./app.js";

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() =>
    app.listen(
      process.env.PORT || 5000,
      console.log("listening on port 5000....")
    )
  )
  .catch((err) => console.log(err));
