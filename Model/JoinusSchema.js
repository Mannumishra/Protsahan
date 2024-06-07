const mongoose = require("mongoose")

const joinSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is must required"]
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
    qualification: {
        type: String,
        required: [true, "qualification is must required"]
    },
    collegename:{
        type: String,
        required: [true, "collegename is must required"]
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
    name1: {
        type: String,
        // required:[true,"name1 is must required"]
    },
    name2: {
        type: String,
        // required:[true,"name1 is must required"]
    },
    occupation1: {
        type: String,
        // required:[true,"name1 is must required"]
    },
    occupation2: {
        type: String,
        // required:[true,"name1 is must required"]
    },
    address1: {
        type: String,
        // required:[true,"name1 is must required"]
    },
    address2: {
        type: String,
        // required:[true,"name1 is must required"]
    },
    number1: {
        type: String,
        // required:[true,"name1 is must required"]
    },
    number2: {
        type: String,
        // required:[true,"name1 is must required"]
    },
    email1: {
        type: String,
        // required:[true,"name1 is must required"]
    },
    email2: {
        type: String,
        // required:[true,"name1 is must required"]
    }
})


const join = mongoose.model("join", joinSchema)

module.exports = join