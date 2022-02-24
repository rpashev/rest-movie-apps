import jwt from "jsonwebtoken";
import HttpError from "../models/http-error.js";

export default (req, res, next) => {
  try {
    if (!req.headers.authorization || req.headers.authorization === "null") {
      req.userData = { userId: null };

      return next();
    }

    const token = req.headers.authorization.split(" ")[1];

    if (token === null) {
      req.userData = { userId: null };
      return next();
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.userData = { userId: decodedToken.userId };

    next();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Something went wrong!!", 500);
    return next(error);
  }
};
