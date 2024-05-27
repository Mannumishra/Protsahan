const mongoose = require("mongoose")

const jobschema = new mongoose.Schema({
    jobpost: {
        type: String,
        required: [true, "Must Required"]
    },
    qualification: {
        type: String,
        required: [true, "Must Required"]
    },
    experience: {
        type: String,
        required: [true, "Must Required"]
    },
    packageanual: {
        type: String,
        required: [true, "Must Required"]
    },
    organisationname: {
        type: String,
        required: [true, "Must Required"]
    },
    address: {
        type: String,
        required: [true, "Must Required"]
    },
    state: {
        type: String,
        required: [true, "Must Required"]
    },
    city: {
        type: String,
        required: [true, "Must Required"]
    },
    pincode: {
        type: String,
        required: [true, "Must Required"]
    },
    contact: {
        type: String,
        required: [true, "Must Required"]
    },
    mobile: {
        type: String,
        required: [true, "Must Required"]
    },
    email: {
        type: String,
        required: [true, "Must Required"]
    }
})

const jobdetails = mongoose.model("Job", jobschema)

module.exports = jobdetails