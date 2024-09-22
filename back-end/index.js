
import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"

import userRouters from "./routes/user.route.js"
import authRouters from "./routes/auth.route.js"

dotenv.config();

mongoose.connect( process.env.MONGO )
.then(() => {
    console.log('MongoDb is connected'); 
}).catch(err => {
   console.log(err);
   
});

const app = express();

app.use(express.json());  // this is allowed as backend input

app.listen(3000, () => {
   console.log('server is running on port 3000');
       
});

app.use( '/api/user', userRouters);
app.use( '/api/auth', authRouters);