const mongoose = require("mongoose")

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is must required"]
    },
    email: {
        type: String,
        required: [true, "email is must required"]
    },
    subject: {
        type: String,
        required: [true, "subject is must required"]
    },
    message: {
        type: String,
        required: [true, "message is must required"]
    },
    city: {
        type: String,
        required: [true, "city is must required"]
    },
    country: {
        type: String,
        required: [true, "country is must required"]
    },
    number: {
        type: String,
        required: [true, "number is must required"]
    },
    address: {
        type: String,
        required: [true, "address is must required"]
    }
})


const contact = mongoose.model("Contact" , ContactSchema)

module.exports = contact