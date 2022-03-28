export const attachWatchlist = (req, res, next) => {
  req.list = "watchlist";
  next();
};

export const attachSeenlist = (req, res, next) => {
  req.list = "seenlist";
  next();
};
