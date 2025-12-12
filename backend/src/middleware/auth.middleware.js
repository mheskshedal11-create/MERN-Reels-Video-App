import FoodPartner from "../models/foodPartner.model.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access - No token provided"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const foodPartner = await FoodPartner.findById(decoded.id);

        if (!foodPartner) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access - Invalid user"
            });
        }

        req.foodPartner = foodPartner;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access - Invalid token",
        });
    }
};
