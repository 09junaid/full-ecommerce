import mongoose from "mongoose";
import colors from "colors";
const connectDB=async()=>{
  try {
   const conn= await mongoose.connect(process.env.DB_URL,{
    dbName:"ecommerceapp",
   })
    console.log(`DB Connection Success ${conn.connection.host}`.bgGreen.white)
  } catch (error) {
    console.log(`DB Connection Failed ${error.message}`.bgRed.white)
  }
}
export default connectDB;
