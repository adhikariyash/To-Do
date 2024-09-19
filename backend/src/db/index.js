import mongoose from "mongoose";
import { DB_Name } from "../constant.js";

const connectDB = async()=>{
    try {
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_Name}`)
       console.log(`Congratulations your ${DB_Name} database has been connected successfully! `)

    } catch (error) {
        console.error("mongodb connection error", error);
        process.exit(1)
    }
}
export default connectDB