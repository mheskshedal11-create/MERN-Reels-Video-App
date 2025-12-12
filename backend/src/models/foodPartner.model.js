import mongoose from "mongoose";

const foodpartnerSchema = new mongoose.Schema({
    name: {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            uniqure: true
        },
        password: {
            type: String,
        }

    }

}, { timestamps: true })

const FoodPartner = mongoose.model('FoodPartner', foodpartnerSchema)

export default FoodPartner