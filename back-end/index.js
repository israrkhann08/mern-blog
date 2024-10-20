
import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"

import userRouters from "./routes/user.route.js"
import authRouters from "./routes/auth.route.js"
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect( process.env.MONGO )
.then(() => {
    console.log('MongoDb is connected'); 
}).catch(err => {
   console.log(err);
   
});

const app = express();

app.use(express.json());  // this is allowed as backend input
app.use(cookieParser());

app.listen(3000, () => {
   console.log('server is running on port 3000');
       
});

app.use( '/api/user', userRouters);
app.use( '/api/auth', authRouters);

// middleware for handle error
app.use( (err, req, res, next) => {
   const statusCode = err.statusCode || 500;
   const message = err.message || 'Internal Server Error';
   res.status(statusCode).json({
      success: false,
      statusCode,
      message,
   });
});