const { createRecord, getRecord, deleteRecord } = require("../Controllar/EmpControllar")
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./Public/Emp")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

const empRouter = require("express").Router()

empRouter.post("/emp", upload.single("resume"), createRecord)
empRouter.get("/emp", getRecord)
empRouter.delete("/emp/:_id", deleteRecord)

module.exports = empRouter