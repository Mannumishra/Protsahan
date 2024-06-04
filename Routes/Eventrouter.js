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


eventRouter.post("/event", upload.fields([
    { name: "image", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
    { name: "image5", maxCount: 1 },
    { name: "image6", maxCount: 1 },
    { name: "image7", maxCount: 1 },
    { name: "image8", maxCount: 1 },
    { name: "image9", maxCount: 1 },
    { name: "image10", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
]), createRecord)
eventRouter.get("/event", getRecord)
eventRouter.get("/event/:_id", getSingleRecord)
eventRouter.delete("/event/:_id", deleteRecord)
eventRouter.put("/event/:_id", upload.fields([
    { name: "image", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
    { name: "image5", maxCount: 1 },
    { name: "image6", maxCount: 1 },
    { name: "image7", maxCount: 1 },
    { name: "image8", maxCount: 1 },
    { name: "image9", maxCount: 1 },
    { name: "image10", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
]), updateRecord)

module.exports = eventRouter