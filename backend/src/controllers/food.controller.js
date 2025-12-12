import Food from "../models/food.model.js";
import { uploadFile } from "../services/storage.services.js";

export const createFoodController = async (req, res) => {
    try {
        const { name, description, foodPartner } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Video file is required"
            });
        }
        const fileUploadResult = await uploadFile(req.file.buffer, Date.now().toString());

        const newFood = new Food({
            name,
            video: fileUploadResult.url,
            description,
            foodPartner
        });

        await newFood.save();

        res.status(201).json({
            success: true,
            message: "Food created successfully",
            food: newFood
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
