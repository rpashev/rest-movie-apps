# Movie app REST API
Node/Express/Mongo REST API for my [React](https://github.com/rpashev/react-movie-app-mern) and [Angular](https://github.com/rpashev/angular-movie-app) movie apps. 


## Endpoints

- /auth/register &emsp; `POST`
- /auth/login &emsp; `POST`
- /user/watchlist &emsp; `GET` | `POST`
- /user/watchlist/:movieId &emsp; `DELETE`
- /user/seenlist &emsp; `GET` | `POST`
- /user/seenlist/:movieId &emsp; `DELETE`
- /user/reviews &emsp; `GET`
- /movies/:movieId/review &emsp; `POST`
- /movies/:movieId/review/:reviewId &emsp; `DELETE`
- /movies/:movieId &emsp; `GET`
- /user-profile &emsp; `POST`
- /public-library &emsp; `GET`



## Setup
### To get a local copy up and running follow these simple steps:

1. Make sure you have **`node`** and **`npm`** installed globally on your machine.  
2. Environmental variables - you need **JWT_SECRET** and **DB_CONNECTION** (mongoDB connection string) to run the app

3. Clone the repo  
    ### `git clone https://github.com/rpashev/rest-movie-apps.git`  

3. Install NPM packages  
    ### `npm install`    
  
4. Run the app in development mode 
    ### `npm start`  
