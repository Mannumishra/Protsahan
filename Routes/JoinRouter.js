const { createRecord, getRecord, deleteRecord } = require("../Controllar/JoinControllar")

const joinrouter = require("express").Router()

joinrouter.post("/join" , createRecord)
joinrouter.get("/join" , getRecord)
joinrouter.delete("/join/:_id" , deleteRecord)

module.exports = joinrouter