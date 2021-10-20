

// "movies/ GET"- movies people watch - shared - 
// "movies/:movieId GET" - shared
// "auth/login POST" - guest
// "auth/register POST" - guest
// "user/:userId/watchlist GET" - user
// "user/:userId/watchlist POST" - user adds to watchlist 
// "user/:userId/watchlist/:movieId DELETE" - user deletes from watchlist
// "user/:userId/seenlist GET" - user
// "user/:userId/seenlist POST" - user adds from seenlist
// "user/:userId/seenlist/:movieID DELETE" - user deletes from seenlist
// "user/:userId/seenlist/:movieID POST" - user posts review
// "user/:userId/seenlist/:movieID/:reviewId PATCH" - user edits review, maybe not necessary but completes the CRUD I guess
// "user/:userId/reviews" - user views his own reviews
// "user/:userId/profile GET" - user
// "user/:userId/profile POST" - user uploads photo

//unnecessary to have userId param in all Urls, userID travels with jwt

