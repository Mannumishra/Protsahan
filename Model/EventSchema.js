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
    image: {
        type: String,
        required: [true, "image is must required"]
    }
})

const event = mongoose.model("event" , eventSchema)

module.exports = event