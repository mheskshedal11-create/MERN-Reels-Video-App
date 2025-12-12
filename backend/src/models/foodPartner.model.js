import mongoose from "mongoose";

const foodpartnerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    password: {
        type: String,
        required: true,
        select: false
    }
}, { timestamps: true });

const FoodPartner = mongoose.model('FoodPartner', foodpartnerSchema);

export default FoodPartner;
