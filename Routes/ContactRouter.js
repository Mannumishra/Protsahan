const { createContact, getRecord, deleteRecord } = require("../Controllar/ContactControlar")

const contactrouter = require("express").Router()


contactrouter.post("/contact", createContact)
contactrouter.get("/contact", getRecord)
contactrouter.delete("/contact/:_id", deleteRecord)

module.exports = contactrouter