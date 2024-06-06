const emp = require("../Model/EmpDetails");
const cloudinary = require('cloudinary').v2;
const nodemailer = require("nodemailer");
const fs = require("fs");

const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
        user: "info@prothsahanteam.org",
        pass: "Info@1234",
    },
});

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
};

const createRecord = async (req, res) => {
    try {
        let { empname, empemail, jobpost, experience, qualification, packageanual, organisationname, address, state, city, pincode, contact, mobile, email } = req.body;
        if (!empname || !empemail || !jobpost || !experience || !qualification || !packageanual || !organisationname || !address || !state || !city || !pincode || !contact || !mobile || !email) {
            return res.status(403).json({
                success: false,
                mess: "Fill all fields"
            });
        } else {
            let data = new emp({ empname, empemail, jobpost, experience, qualification, packageanual, organisationname, address, state, city, pincode, contact, mobile, email });
            if (req.file) {
                const fileUrl = await uploadImage(req.file.path);
                data.resume = fileUrl;
            }
            await data.save();

            // Mail to the person applying for the job
            const mailOptionsApplicant = {
                from: "info@prothsahanteam.org",
                to: data.empemail,
                subject: "Thank you for applying for a job",
                text: `
                    Thank you for applying for a job. You will receive a call soon from the employer's side.
                `,
            };

            const mailOptionsPoster = {
                from: "info@prothsahanteam.org",
                to: data.email,
                subject: "New Job Application Received",
                text: `
                    A new job application has been received for the position of ${data.jobpost}.
                    Applicant Name: ${data.empname}
                    Applicant Email: ${data.empemail}
                    Qualification: ${data.qualification}
                    Experience: ${data.experience}
                    Contact: ${data.mobile}
                    
                    Please review the application and get in touch with the candidate.
                `,
            };

            console.log(mailOptionsApplicant);
            console.log(mailOptionsPoster);

            transporter.sendMail(mailOptionsApplicant, (error, info) => {
                if (error) {
                    console.error("Error sending email to applicant:", error);
                    return res.status(500).json({
                        success: false,
                        mess: "Error sending email to applicant",
                        error: error.message,
                    });
                }
                console.log("Email sent to applicant:", info.response);
                transporter.sendMail(mailOptionsPoster, (error, info) => {
                    if (error) {
                        console.error("Error sending email to job poster:", error);
                        return res.status(500).json({
                            success: false,
                            mess: "Error sending email to job poster",
                            error: error.message,
                        });
                    }
                    console.log("Email sent to job poster:", info.response);
                    res.status(200).json({
                        success: true,
                        mess: "Record Sent",
                        data: data
                    });
                });
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        });
    }
};

const getRecord = async (req, res) => {
    try {
        let data = await emp.find();
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
};

const deleteRecord = async (req, res) => {
    try {
        let data = await emp.findOne({ _id: req.params._id });
        if (data) {
            try {
                fs.unlinkSync(data.resume);
            } catch (error) {
                console.log("Error deleting file:", error);
            }
            await data.deleteOne();
        }
        res.status(200).json({
            success: true,
            mess: "Record Deleted"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        });
    }
};

module.exports = {
    createRecord: createRecord,
    getRecord: getRecord,
    deleteRecord: deleteRecord
};
