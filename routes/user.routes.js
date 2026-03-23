import { Router } from 'express';
import {getUsers , getUser }from "../controllers/user.controller.js" 
import authorize from "../middleware/auth.middleware.js"
const userRouter = Router();


userRouter.get( "/",getUsers);


userRouter.get( "/:id",authorize,getUser);

userRouter.post( "/",(req,res)=>
    res.send("CREATE NEW USERS")
);

userRouter.put( "/:id",(req,res)=>
    res.send("UPDATE THE USER")
);

userRouter.delete( "/:id",(req,res)=>
    res.send("DELETE A USER")
);


export default userRouter;