const event = require("../Model/EventSchema");
const cloudinary = require('cloudinary').v2;
const fs = require("fs");

cloudinary.config({
    cloud_name: "dglihfwse",
    api_key: "939345957566958",
    api_secret: "q-Pg0dyWquxjatuRb62-PtFzkM0"
});

const uploadImage = async (file) => {
    try {
        let uploadedFile = await cloudinary.uploader.upload(file);
        return uploadedFile.secure_url;
    } catch (error) {
        console.log(error);
    }
}

const createRecord = async (req, res) => {
    try {
        let { eventname, eventdate, eventdescription } = req.body;
        if (!eventname || !eventdate || !eventdescription) {
            return res.status(403).json({
                success: false,
                mess: "Fill all fields"
            });
        } else {
            let data = new event({ eventname, eventdate, eventdescription });
            if (req.file) {
                const fileUrl = await uploadImage(req.file.path);
                data.image = fileUrl;
            }
            await data.save();
            res.status(200).json({
                success: true,
                mess: "Record Saved",
                data: data
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        });
    }
}

const getRecord = async (req, res) => {
    try {
        let data = await event.find();
        res.status(200).json({
            success: true,
            mess: "Records Found",
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        });
    }
}

const getSingleRecord = async (req, res) => {
    try {
        let data = await event.findById(req.params._id);
        res.status(200).json({
            success: true,
            mess: "Record Found",
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        });
    }
}

const updateRecord = async (req, res) => {
    try {
        let data = await event.findById(req.params._id);
        console.log(data)
        if (data) {
            data.eventname = req.body.eventname;
            data.eventdate = req.body.eventdate;
            data.eventdescription = req.body.eventdescription;
            if (req.file) {
                if (data.image) {
                    try {
                        fs.unlinkSync(data.image);
                    } catch (error) {
                        console.log(error);
                    }
                }
                const fileUrl = await uploadImage(req.file.path);
                data.image = fileUrl;
            }
            await data.save();
            res.status(200).json({
                success: true,
                mess: "Record Updated Successfully",
                data: data
            });
        } else {
            res.status(404).json({
                success: false,
                mess: "Record Not Found"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        });
    }
}

const deleteRecord = async (req, res) => {
    try {
        let data = await event.findById(req.params._id);
        if (data) {
            try {
                fs.unlinkSync(data.image)
            } catch (error) { }

            await data.deleteOne()
            res.status(200).json({
                success: true,
                mess: "Event Delete Successfully",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        });
    }
}
module.exports = {
    createRecord: createRecord,
    getRecord: getRecord,
    getSingleRecord: getSingleRecord,
    updateRecord: updateRecord,
    deleteRecord:deleteRecord
}
