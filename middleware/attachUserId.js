import jwt from "jsonwebtoken";
import HttpError from "../models/http-error.js";

export default (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      req.userData = { userId: null };

      return next();
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      req.userData = { userId: null };
      return next();
    }
    

    const decodedToken = jwt.verify(
      token,
      "I_like_peanut_butter_banana_protein_shakes"
    );

    req.userData = { userId: decodedToken.userId };

    next();
  } catch (err) {
    const error = new HttpError("Something went wrong!!", 500);
    return next(error);
  }
};
