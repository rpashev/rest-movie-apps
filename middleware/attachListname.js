export default (req, res, next) => {
  if (req.url.includes("watchlist")) {
    req.list = "watchlist";
  } else if (req.url.includes("seenlist")) {
    req.list = "seenlist";
  }
  next();
};
