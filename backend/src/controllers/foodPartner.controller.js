import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import FoodPartner from '../models/foodPartner.model.js';

export const registerController = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields required'
            });
        }

        const existingUser = await FoodPartner.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered!'
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new FoodPartner({
            fullName,
            email,
            password: hashPassword
        });

        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        res.cookie('token', token, { httpOnly: true });

        const newUserObj = newUser.toObject();
        delete newUserObj.password;

        res.status(201).json({
            success: true,
            message: "User registered successfully!",
            newUser: newUserObj,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Required both fields"
            });
        }

        const existingUser = await FoodPartner.findOne({ email }).select("+password");
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            { id: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, { httpOnly: true });

        const loginUser = existingUser.toObject();
        delete loginUser.password;

        res.status(200).json({
            success: true,
            message: "User login successfully",
            user: loginUser,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const logoutController = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({
            success: true,
            message: "Logout successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
