import mongoose from "mongoose"
const dbConnect = async (url) =>{
    mongoose.connect(url)
}

export default dbConnect