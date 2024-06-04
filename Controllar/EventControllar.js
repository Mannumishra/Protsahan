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
        console.log(req.body)
        let { eventname, eventdate, eventdescription } = req.body;
        const { image, image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, pdf } = req.files
        if (!eventname || !eventdate || !eventdescription) {
            return res.status(403).json({
                success: false,
                mess: "Fill all fields"
            });
        } else {
            let data = new event({ eventname, eventdate, eventdescription });
            console.log(image)
            if (image) {
                const fileUrl = await uploadImage(image[0].path)
                data.image = fileUrl;
            }
            if (image1) {
                const fileUrl = await uploadImage(image1[0].path)
                data.image1 = fileUrl;
            }
            if (image2) {
                const fileUrl = await uploadImage(image2[0].path)
                data.image2 = fileUrl;
            }
            if (image3) {
                const fileUrl = await uploadImage(image3[0].path)
                data.image3 = fileUrl;
            }
            if (image4) {
                const fileUrl = await uploadImage(image4[0].path)
                data.image4 = fileUrl;
            }
            if (image5) {
                const fileUrl = await uploadImage(image5[0].path)
                data.image5 = fileUrl;
            }
            if (image6) {
                const fileUrl = await uploadImage(image6[0].path)
                data.image6 = fileUrl;
            }
            if (image7) {
                const fileUrl = await uploadImage(image7[0].path)
                data.image7 = fileUrl;
            }
            if (image8) {
                const fileUrl = await uploadImage(image8[0].path)
                data.image8 = fileUrl;
            }
            if (image9) {
                const fileUrl = await uploadImage(image9[0].path)
                data.image9 = fileUrl;
            }
            if (image10) {
                const fileUrl = await uploadImage(image10[0].path)
                data.image10 = fileUrl;
            }
            if (pdf) {
                const fileurl = await uploadImage(pdf[0].path)
                data.pdf = fileurl
            }
            await data.save();
            try {
                fs.unlinkSync(image[0].path)
            } catch (error) { }
            try {
                fs.unlinkSync(image1[0].path)
            } catch (error) { }
            try {
                fs.unlinkSync(image2[0].path)
            } catch (error) { }
            try {
                fs.unlinkSync(image3[0].path)
            } catch (error) { }
            try {
                fs.unlinkSync(image4[0].path)
            } catch (error) { }
            try {
                fs.unlinkSync(image5[0].path)
            } catch (error) { }
            try {
                fs.unlinkSync(image6[0].path)
            } catch (error) { }
            try {
                fs.unlinkSync(image7[0].path)
            } catch (error) { }
            try {
                fs.unlinkSync(image8[0].path)
            } catch (error) { }
            try {
                fs.unlinkSync(image9[0].path)
            } catch (error) { }
            try {
                fs.unlinkSync(image10[0].path)
            } catch (error) { }
            try {
                fs.unlinkSync(pdf[0].path)
            } catch (error) { }
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
                    const oldImage = data.pdf.split("/").pop().split(".")[0]
                    try {
                        await cloudinary.uploader.destroy(oldImage)
                    } catch (error) { }
                    const url = uploadImage(req.files.pdf[0].path)
                    data.pdf = url
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
