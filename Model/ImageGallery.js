const mongoose = require("mongoose")

const imageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is must Required"]
    },
    description: {
        type: String,
        required: [true, "description is must Required"]
    },
    images: [
         String
    ],
   
})

const image = mongoose.model("gallery", imageSchema)

module.exports = image