const { createContact } = require("../Controllar/ContactControlar")

const contactrouter = require("express").Router()


contactrouter.post("/contact" , createContact)

module.exports = contactrouter