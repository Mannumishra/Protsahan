const { createRecord, getRecord, deleteRecord } = require("../Controllar/EmpControllar")
const empRouter = require("express").Router()
const multer = require('multer')
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = './Public/Emp';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage })


empRouter.post("/emp", upload.single("resume"), createRecord)
empRouter.get("/emp", getRecord)
empRouter.delete("/emp/:_id", deleteRecord)

module.exports = empRouter