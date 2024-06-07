const { createRecord, getRecord, getSingleRecord, deleteRecord, updateRecord } = require("../Controllar/ImageControllar");
const multer = require("multer");
const express = require("express");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./Public/Gallery");
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

const galleryRouter = express.Router();


galleryRouter.post("/gallery", createRecord);
galleryRouter.get("/gallery", getRecord);
galleryRouter.get("/gallery/:_id", getSingleRecord);
galleryRouter.delete("/gallery/:_id", deleteRecord);
galleryRouter.put("/gallery/:_id", upload.fields([
    { name: "image1", maxCount: 10 }
]), updateRecord);

module.exports = galleryRouter;
