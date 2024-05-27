const { createJob, getRecord, updateJob, getSingleRecord, deleteJob } = require("../Controllar/JobControllar")

const jobrouter = require("express").Router()

jobrouter.post("/job", createJob)
jobrouter.get("/job", getRecord)
jobrouter.get("/job/:_id", getSingleRecord)
jobrouter.put("/job/:_id", updateJob)
jobrouter.delete("/job/:_id", deleteJob)

module.exports = jobrouter