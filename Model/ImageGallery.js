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
    image1: {
        type: String,
        required: [true, "image is must Required"]
    },
    image2: {
        type: String
    },
    image3: {
        type: String
    },
    image4: {
        type: String
    },
    image5: {
        type: String
    },
    image6: {
        type: String
    },
    image7: {
        type: String
    },
    image8: {
        type: String
    },
    image9: {
        type: String
    }, image10: {
        type: String,
    }
})

const image = mongoose.model("gallery", imageSchema)

module.exports = image