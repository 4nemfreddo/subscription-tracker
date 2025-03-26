import mongoose from "mongoose"

export const signUp = async (req, res, next) => {
    //Signup logic
    const session = await mongoose.startSession();
    session.startTransaction();
}

export const signIn = async (req, res, next) => {
    //Signin logic
}

export const signOut = async (req, res, next) => {
    //Signout logic 
}