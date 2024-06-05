const emp = require("../Model/EmpDetails")
const cloudinary = require('cloudinary').v2
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
        user: "info@prothsahanteam.org",
        pass: "Info@1234",
    },
})
const fs = require("fs")

cloudinary.config({
    cloud_name: "dglihfwse",
    api_key: "939345957566958",
    api_secret: "q-Pg0dyWquxjatuRb62-PtFzkM0"
});

const uploadImage = async (file) => {
    try {
        let uplodeFile = await cloudinary.uploader.upload(file)
        return uplodeFile.secure_url
    } catch (error) {
        console.log(error)
    }
}
const createRecord = async (req, res) => {
    try {
        let { empname, empemail } = req.body
        if (!empname || !empemail) {
            return res.status(403).json({
                success: false,
                mess: "Fill all field"
            })
        }
        else {
            let data = new emp({ empname, empemail })
            if (req.file) {
                const fileUrl = await uploadImage(req.file.path)
                data.resume = fileUrl
            }
            await data.save()
            const mailOptions = {
                from: 'info@prothsahanteam.org',
                to: process.env.MAIL_SENDER,
                subject: "Thanku for appliing job",
                text: `
                    Email:${empemail}
                `,
            };
            console.log(mailOptions);
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error sending email:", error);
                    return res.status(500).json({
                        success: false,
                        mess: "Error sending email",
                        error: error.message,
                    });
                }
                console.log("Email sent:", info.response);
                res.status(200).json({
                    success: true,
                    mess: "Record Send",
                    data: data
                })
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}

const getRecord = async (req, res) => {
    try {
        let data = await emp.find()
        res.status(200).json({
            success: true,
            mess: "Record Found",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server error"
        })
    }
}

const deleteRecord = async (req, res) => {
    try {
        let data = await emp.findOne({ _id: req.params._id })
        if (data) {
            try {
                fs.unlinkSync(data.resume)
            } catch (error) { }
            await data.deleteOne()
        }
        res.status(200).json({
            success: true,
            mess: "Record Deleted"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server error"
        })
    }
}

module.exports = {
    createRecord: createRecord,
    getRecord: getRecord,
    deleteRecord: deleteRecord
}