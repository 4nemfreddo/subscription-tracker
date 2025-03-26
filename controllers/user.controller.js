import User from "../models/user.model.js";

export const getUsers = async ( req, res, next) => {
    try {
        const users = await User.find();

        res.status(200).json({ success: true, data: users });
    } catch (error) {
        next(error);
    }
}
//54639584672cf2e8d04bde52eb7b8aa02134c63d
export const getUser = async ( req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select(args: '-password');

        if (!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
}