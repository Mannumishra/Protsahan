const { createRecord, getRecord, deleteRecord } = require("../Controllar/VolunteerControllar")

const volunterRouter = require("express").Router()

volunterRouter.post("/volunteer" , createRecord)
volunterRouter.get("/volunteer" , getRecord)
volunterRouter.delete("/volunteer/:_id" , deleteRecord)

module.exports = volunterRouter