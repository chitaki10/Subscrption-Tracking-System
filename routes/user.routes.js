import { Router } from 'express';


const userRouter = Router();


userRouter.get( "/",(req,res) =>
    res.send("GET ALL USERS")
);

userRouter.get( "/:id",(req,res)=>
    res.send("GET USERS DETAILS")
);

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