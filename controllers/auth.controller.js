import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
    //Signup logic
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        //logic to create new user
        const { name, email, password } = req.body;

        //check if user already exists
        const existingUser = await User.findone({ email });

        if(existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        // Hash password
         const salt = await bcrypt.genSalt( 10 );
         const hashedPassword = await bcrypt.hash(password,salt);

         const newUsers = await User.create([{ name, email, password: hashedPassword }], { session });
         
         const token = jwt.sign({ userId: newUsers[0]._id}, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

        await session.commitTransaction;

        res.status(201).json({
            sucess: true,
            message: 'User created successfully',
            data: {
                token,
                user:newUsers[0]
            }
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const signIn = async (req, res, next) => {
    //Signin logic
}

export const signOut = async (req, res, next) => {
    //Signout logic 
}