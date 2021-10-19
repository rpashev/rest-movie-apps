const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new HttpError("Authentication failed! Access denied!", 401);
    }
    const decodedToken = jwt.verify(
      token,
      "I_like_peanut_butter_banana_protein_shakes"
    );

    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed! Access denied!", 401);
    return next(error);
  }
};
