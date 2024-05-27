const { createJob, getRecord } = require("../Controllar/JobControllar")

const jobrouter = require("express").Router()

jobrouter.post("/job" , createJob)
jobrouter.get("/job" , getRecord)

module.exports = jobrouter