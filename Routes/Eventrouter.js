const { createRecord, getRecord, getSingleRecord, updateRecord, deleteRecord } = require("../Controllar/EventControllar")
const eventRouter = require("express").Router()
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./Public/Event");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('File type not allowed'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: fileFilter
});


eventRouter.post("/event", createRecord)
eventRouter.get("/event", getRecord)
eventRouter.get("/event/:_id", getSingleRecord)
eventRouter.delete("/event/:_id", deleteRecord)
eventRouter.put("/event/:_id", upload.fields([
    { name: "pdf", maxCount: 10 },
]), updateRecord)

module.exports = eventRouter