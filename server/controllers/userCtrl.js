import User from '../models/userModel.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
export const register = async (req, res, next) => {
    try {
        // implementation của hàm
        const { name, email, password, picturePath } = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({ name, email, password: hashedPassword, picturePath });
        const createUser = await user.save();
        return res.json(createUser);
    } catch (error) {
        next(error)
    }
};

export const login = async (req, res, next) => {
    try {
        // implementation của hàm
        const { email, password } = req.body;
        const isUser = await User.findOne({ email });
        if (!isUser) return res.status(404).json("User do not exist");

        const isMatched = await bcrypt.compare(password, isUser.password);
        if (!isMatched) {
            return res.status(404).json("Email or password invalid");
        }

        const token = jwt.sign({ id: isUser._id }, process.env.mysecrettoken);
        if (isUser) {
            const { password, ...userRes } = isUser._doc
            return res.status(201).cookie('token', { token }, { httpOnly: true }).json({ user: userRes })
        }
    } catch (error) {
        // xử lý lỗi
        next(error)

    }
};