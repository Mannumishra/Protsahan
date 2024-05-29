const { createRecord, getRecord, getSingleRecord, updateRecord, deleteRecord } = require("../Controllar/EventControllar")
const eventRouter = require("express").Router()
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./Public/Event")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })


eventRouter.post("/event", upload.single("image"), createRecord)
eventRouter.get("/event", getRecord)
eventRouter.get("/event/:_id", getSingleRecord)
eventRouter.delete("/event/:_id", deleteRecord)
eventRouter.put("/event/:_id", upload.single("image"), updateRecord)

module.exports = eventRouter