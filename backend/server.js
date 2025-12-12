import app from "./src/app.js";
import dotenv from 'dotenv'
import dbConnect from "./src/db/db.js";
dotenv.config()

const PORT = process.env.PORT || 8000

//connect db
dbConnect()

app.listen(PORT, () => {
    console.log(`server is running http://localhost:${PORT}`)
})