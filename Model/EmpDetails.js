const mongoose = require("mongoose")

const empdetailsSchema = new mongoose.Schema({
    empname:{
        type:String,
        required:[true,"Name is must Required"]
    },
    empemail:{
        type:String,
        required:[true,"empemail is must Required"]
    },
    resume:{
        type:String,
        required:[true,"Resume is must Required"]
    }
})

const emp = mongoose.model("empdetails" , empdetailsSchema)

module.exports = emp