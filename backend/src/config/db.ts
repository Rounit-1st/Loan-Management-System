import mongoose, { mongo } from "mongoose"

export const connectToDatabase = async () => {
   
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI as string)
        console.log(`Host: ${conn.connection.host}`)
    }
    catch(error:any){
        console.error(`Error: ${error.message}`);
        // process.exit(1) // 1 code means exit with failure 0 means success
    }
};