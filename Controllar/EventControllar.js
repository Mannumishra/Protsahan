const event = require("../Model/EventSchema");
const cloudinary = require('cloudinary').v2;
const fs = require("fs");
const path = require('path');
const multer = require('multer');


// Define storage settings for multer
const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../uploads');
        try {
            await fs.mkdir(uploadDir, { recursive: true });
            cb(null, uploadDir);
        } catch (error) {
            cb(error, null);
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).array('images', 10);

cloudinary.config({
    cloud_name: "dnv1sgfjx",
    api_key: "215814615744424",
    api_secret: "hd5TVsc8zrVtU_vgetQWIhZKy2k"
});


const createRecord = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({
                    success: false,
                    error: "File upload failed",
                    details: err.message
                });
            } else if (err) {
                return res.status(500).json({
                    success: false,
                    error: "Internal Server Error",
                    details: err.message
                });
            }
            
            const { eventname, eventdate ,eventdescription } = req.body;
            if (!eventname || !eventdate || !eventdescription) {
                return res.status(400).json({
                    success: false,
                    error: "Please fill all fields"
                });
            }

            try {
                const AllImagesUrls = [];
                for (let index = 0; index < req.files.length; index++) {
                    const file = req.files[index];
                    const safePublicId = file.originalname.replace(/[^a-zA-Z0-9_-]/g, '_');
                    const uploadResult = await cloudinary.uploader.upload(file.path, {
                        folder: 'gallery',
                        public_id: safePublicId 
                    });
                    AllImagesUrls.push(uploadResult.secure_url);
                }

                const data = new Image({
                    eventname,
                    eventdate,
                    eventdescription,
                    images: AllImagesUrls 
                })
                await data.save();
                res.status(200).json({
                    success: true,
                    message: "Gallery Created",
                    data: data
                });
            } catch (error) {
                console.error("Error uploading images to Cloudinary:", error);
                res.status(500).json({
                    success: false,
                    error: "Error uploading images to Cloudinary",
                    details: error.message
                });
            }
        });
    } catch (error) {
        console.error("Error in createRecord function:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
};


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
            data.eventeventdate = req.body.eventeventdate;
            if (req.files) {
                if (req.files.image) {
                    const oldImage = data.image.split("/").pop().split(".")[0]
                    try {
                        await cloudinary.uploader.destroy(oldImage)
                    } catch (error) { }
                    const url = uploadImage(req.files.image[0].path)
                    data.image = url
                }
                if (req.files.image1) {
                    const oldImage = data.image1.split("/").pop().split(".")[0]
                    try {
                        await cloudinary.uploader.destroy(oldImage)
                    } catch (error) { }
                    const url = uploadImage(req.files.image1[0].path)
                    data.image1 = url
                }
                if (req.files.image2) {
                    const oldImage = data.image2.split("/").pop().split(".")[0]
                    try {
                        await cloudinary.uploader.destroy(oldImage)
                    } catch (error) { }
                    const url = uploadImage(req.files.image2[0].path)
                    data.image2 = url
                }
                if (req.files.image3) {
                    const oldImage = data.image3.split("/").pop().split(".")[0]
                    try {
                        await cloudinary.uploader.destroy(oldImage)
                    } catch (error) { }
                    const url = uploadImage(req.files.image3[0].path)
                    data.image3 = url
                }
                if (req.files.image4) {
                    const oldImage = data.image4.split("/").pop().split(".")[0]
                    try {
                        await cloudinary.uploader.destroy(oldImage)
                    } catch (error) { }
                    const url = uploadImage(req.files.image4[0].path)
                    data.image4 = url
                }
                if (req.files.image5) {
                    const oldImage = data.image5.split("/").pop().split(".")[0]
                    try {
                        await cloudinary.uploader.destroy(oldImage)
                    } catch (error) { }
                    const url = uploadImage(req.files.image5[0].path)
                    data.image5 = url
                }
                if (req.files.image6) {
                    const oldImage = data.image6.split("/").pop().split(".")[0]
                    try {
                        await cloudinary.uploader.destroy(oldImage)
                    } catch (error) { }
                    const url = uploadImage(req.files.image6[0].path)
                    data.image6 = url
                }
                if (req.files.image7) {
                    const oldImage = data.image7.split("/").pop().split(".")[0]
                    try {
                        await cloudinary.uploader.destroy(oldImage)
                    } catch (error) { }
                    const url = uploadImage(req.files.image7[0].path)
                    data.image7 = url
                }
                if (req.files.image8) {
                    const oldImage = data.image8.split("/").pop().split(".")[0]
                    try {
                        await cloudinary.uploader.destroy(oldImage)
                    } catch (error) { }
                    const url = uploadImage(req.files.image8[0].path)
                    data.image8 = url
                }
                if (req.files.image9) {
                    const oldImage = data.image9.split("/").pop().split(".")[0]
                    try {
                        await cloudinary.uploader.destroy(oldImage)
                    } catch (error) { }
                    const url = uploadImage(req.files.image9[0].path)
                    data.image9 = url
                }
                if (req.files.image10) {
                    const oldImage = data.image10.split("/").pop().split(".")[0]
                    try {
                        await cloudinary.uploader.destroy(oldImage)
                    } catch (error) { }
                    const url = uploadImage(req.files.image10[0].path)
                    data.image10 = url
                }
                if (req.files.pdf) {
                    try {
                        fs.unlinkSync(data.pdf)
                    } catch (error) { }
                    data.pdf = pdf[0].path
                }
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
    deleteRecord: deleteRecord
}
