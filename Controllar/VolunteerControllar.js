const volunteer = require("../Model/VolunteerSchema");
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

const createRecord = async (req, res) => {
    try {
        // console.log(req.body)
        let { donation, sirName, firstName, lastName, dob, panNo, email, mobile, address, country, state, city, pinCode, citizenship, helpMessage, money } = req.body;
        if (!donation || !sirName || !firstName || !lastName || !dob || !panNo || !email || !mobile || !address || !country || !state || !city || !pinCode || !citizenship || !helpMessage || !money) {
            return res.status(403).json({
                success: false,
                mess: "Fill all required fields"
            });
        } else {
            const data = new volunteer({ donation, sirName, firstName, lastName, dob, panNo, email, mobile, address, country, state, city, pinCode, citizenship, helpMessage, money });
            await data.save();
            const mailOptionsApplicant = {
                from: "info@prothsahanteam.org",
                to: data.email,
                subject: "Recipt For Money Donation.",
                text: `
                    Thank you for donate money to protsahn team.
                `,
            };

            const mailOptionsPoster = {
                from: "info@prothsahanteam.org",
                to: process.env.MAIL_SENDER,
                subject: "New Donation",
                text: `
                    A new donation we have received form doner.
                   Doner Name: ${data.firstName}${data.lastName}
                   Doner Email: ${data.email}
                    Doner Mobile: ${data.mobile}
                    Donate Money: ${data.money} .
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
}

const getRecord = async (req, res) => {
    try {
        let data = await volunteer.find();
        res.status(200).json({
            success: true,
            mess: "Record found",
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        });
    }
}

const deleteRecord = async (req, res) => {
    try {
        let data = await volunteer.findOne({ _id: req.params._id });
        await data.deleteOne();
        res.status(200).json({
            success: true,
            mess: "Record deleted"
        });
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
    deleteRecord: deleteRecord
};
