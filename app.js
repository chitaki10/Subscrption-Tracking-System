import express from 'express';

import {PORT} from './config/env.js'

import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import authRouter from "./routes/auth.routes.js";


const app = express();

app.use('/api/v1/auth',userRouter)
app.use('/api/v1/auth',subscriptionRouter)
app.use('/api/v1/auth',authRouter)

app.get("/",(req,res)=>{
    res.send("Welcome to the Subscription Tracker API");
});

app.listen(PORT,() => {
    console.log(`Subscrition Tracker API is running on http://localhost:${PORT}`);
});


export default app;