const mongoose = require("mongoose")

const connectDB = async()=>{
    try {
        await mongoose.connect("mongodb+srv://mannu22072000:XzfCPsPhZLZZDgTy@cluster0.aa7ehkr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        // await mongoose.connect("mongodb://localhost:27017/protsahan")
        console.log("Database connected Successfully")
    } catch (error) {
        console.log(error);
    }
}

connectDB()