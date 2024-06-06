const jobdetails = require("../Model/JobSchema");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
        user: "info@prothsahanteam.org",
        pass: "Info@1234",
    },
});

const createJob = async (req, res) => {
    try {
        console.log("i am hit", req.body);
        const { jobpost, experience, qualification, packageanual, organisationname, address, state, city, pincode, contact, mobile, email } = req.body;
        if (!jobpost || !experience || !qualification || !packageanual || !organisationname || !address || !state || !city || !pincode || !contact || !mobile || !email) {
            return res.status(403).json({
                success: false,
                mess: "Fill all required fields"
            });
        }
        const data = new jobdetails({ jobpost, experience, qualification, packageanual, organisationname, address, state, city, pincode, contact, mobile, email });
        await data.save();

        const mailOptions = {
            from: process.env.MAIL_SENDER,
            to: `${data.email}, ${process.env.MAIL_SENDER}`,
            subject: "Dear Friend, Thanks for your valuable time and support in joining the initiative of Youth Empowerment with a aim No Youth Without Job",
            text: `
                Thank you for posting a job on our website. We will contact you with candidates as soon as possible.
                Email: ${email}
                We have posted your job description. 
                jobpost :${data.jobpost}
                experience :${data.experience}
                qualification :${data.qualification}
                packageanual :${data.packageanual}
                Once again, thanks for trusting our objective.
                Your continued support and innovative ideas are our motivation and encourage us to do more for society.
                Best wishes
                Jai Hind
                Vivek Vashistha
                President
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
                mess: "Job Post Successful",
                data: data
            });
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error",
            error: error.message,
        });
    }
};

const getRecord = async (req, res) => {
    try {
        let data = await jobdetails.find();
        res.status(200).json({
            success: true,
            mess: "Record Found",
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error",
            error: error.message,
        });
    }
};

const getSingleRecord = async (req, res) => {
    try {
        let data = await jobdetails.findOne({ _id: req.params._id });
        res.status(200).json({
            success: true,
            mess: "Record Found",
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error",
            error: error.message,
        });
    }
};

const updateJob = async (req, res) => {
    try {
        let data = await jobdetails.findOne({ _id: req.params._id });
        if (data) {
            data.jobpost = req.body.jobpost ?? data.jobpost;
            data.experience = req.body.experience ?? data.experience;
            data.qualification = req.body.qualification ?? data.qualification;
            data.packageanual = req.body.packageanual ?? data.packageanual;
            data.organisationname = req.body.organisationname ?? data.organisationname;
            data.address = req.body.address ?? data.address;
            data.state = req.body.state ?? data.state;
            data.city = req.body.city ?? data.city;
            data.pincode = req.body.pincode ?? data.pincode;
            data.contact = req.body.contact ?? data.contact;
            data.mobile = req.body.mobile ?? data.mobile;
            data.email = req.body.email ?? data.email;
            await data.save();
            res.status(200).json({
                success: true,
                mess: "Job Post updated successfully",
                data: data
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error",
            error: error.message,
        });
    }
};

const deleteJob = async (req, res) => {
    try {
        let data = await jobdetails.findOne({ _id: req.params._id });
        await data.deleteOne();
        res.status(200).json({
            success: true,
            mess: "Job Deleted Successfully",
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error",
            error: error.message,
        });
    }
};

module.exports = {
    createJob: createJob,
    getRecord: getRecord,
    updateJob: updateJob,
    getSingleRecord: getSingleRecord,
    deleteJob: deleteJob
};
