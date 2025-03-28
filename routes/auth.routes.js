import { Router } from "express";
import { signUp, signIn, signOut } from "../controllers/auth.controller.js";


const authRouter = Router();

// Path:/api/v1/auth/signup(POST)
authRouter.post('/sign-up', signUp);

// Path:/api/v1/auth/signin
authRouter.post('/sign-in', signIn);

// Path:/api/v1/auth/signout
authRouter.post('/sign-out', signOut);

export default authRouter;
