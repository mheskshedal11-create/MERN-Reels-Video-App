import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import app from "./src/app.js";
import dbConnect from "./src/db/db.js";
import cookieParser from 'cookie-parser';
import router from './src/route/auth.route.js';
import foodPartnerRouter from './src/route/foodPartner.route.js';
import foodRouter from './src/route/food.route.js';

const PORT = process.env.PORT || 8000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


//connect db
dbConnect()

//router
app.use('/api/v1/auth', router)
app.use('/api/v1/foodpartner', foodPartnerRouter)
app.use('/api/v1/food', foodRouter)

app.listen(PORT, () => {
    console.log(`server is running http://localhost:${PORT}`)
})