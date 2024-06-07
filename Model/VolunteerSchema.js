const mongoose = require("mongoose")

const volunteerSchema = new mongoose.Schema({
    donation: {
        type: String,
        required: [true, "donation is must required"]
    },
    sirName: {
        type: String,
        required: [true, "sirName is must required"]
    },
    firstName: {
        type: String,
        required: [true, "firstName is must required"]
    },
    lastName: {
        type: String,
        required: [true, "lastName is must required"]
    },
    dob: {
        type: String,
        required: [true, "dob is must required"]
    },
    panNo: {
        type: String,
        required: [true, "panNo is must required"]
    },
    email: {
        type: String,
        required: [true, "email is must required"]
    },
    mobile: {
        type: String,
        required: [true, "mobile is must required"]
    },
    address: {
        type: String,
        required: [true, "address is must required"]
    },
    country: {
        type: String,
        required: [true, "country is must required"]
    },
    state: {
        type: String,
        required: [true, "state is must required"]
    },
    city: {
        type: String,
        required: [true, "city is must required"]
    },
    pinCode: {
        type: String,
        required: [true, "pinCode is must required"]
    },
    citizenship: {
        type: String,
        required: [true, "citizenship is must required"]
    },
    helpMessage: {
        type: String,
        required: [true, "helpMessage is must required"]
    },
    money:{
        type:String,
        required:[true,"Donate monay is must requird"]
    },
    intersted:{
        type:String,
        required:[true,"Intersted is must Required"]
    }
})

const volunteer = mongoose.model("volnteer" ,volunteerSchema)

module.exports = volunteer