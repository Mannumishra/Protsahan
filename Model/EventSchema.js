const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    eventname: {
        type: String,
        required: [true, "Event Name is must required"]
    },
    eventdate: {
        type: String,
        required: [true, "eventdate is must required"]
    },
    eventdescription: {
        type: String,
        required: [true, "eventdescription is must required"]
    },
    name:{
        type:String,
        required:[true,"name is must required"]
    },
    address:{
        type:String,
        required:[true,"name is must required"]
    },
    pdf:{
        type:String,
        required:[true , "pdf is must required"]
    },
    image: {
        type: String,
        required: [true, "image is must required"]
    },
    image1: {
        type: String,
        // required: [true, "image is must required"]
    },
    image2: {
        type: String,
        // required: [true, "image is must required"]
    },
    image3: {
        type: String,
        // required: [true, "image is must required"]
    },
    image4: {
        type: String,
        // required: [true, "image is must required"]
    },
    image5: {
        type: String,
        // required: [true, "image is must required"]
    },
    image6: {
        type: String,
        // required: [true, "image is must required"]
    },
    image7: {
        type: String,
        // required: [true, "image is must required"]
    },
    image8: {
        type: String,
        // required: [true, "image is must required"]
    },
    image9: {
        type: String,
        // required: [true, "image is must required"]
    },
    image10: {
        type: String,
        // required: [true, "image is must required"]
    }
})

const event = mongoose.model("event" , eventSchema)

module.exports = event