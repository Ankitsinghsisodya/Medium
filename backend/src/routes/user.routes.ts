import { Hono } from "hono";
import { signIn, signUp } from "../controller/user.controller";


const userRouter = new Hono();

userRouter.post('/signup', signUp);
userRouter.post('/signin', signIn);

export default userRouter;
