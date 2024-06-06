const join = require("../Model/JoinusSchema");
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
        let { title, firstName, lastName, dob, panNo, email, mobile, address, country, state, city, pinCode, citizenship, helpMessage, name1, name2, address1, address2, occupation1, occupation2, number1, number2, email1, email2 } = req.body;
        if (!title || !firstName || !lastName || !dob || !panNo || !email || !mobile || !address || !country || !state || !city || !pinCode || !citizenship || !helpMessage) {
            return res.status(403).json({
                success: false,
                mess: "Fill all required fields"
            });
        } else {
            const data = new join({ title, firstName, lastName, dob, panNo, email, mobile, address, country, state, city, pinCode, citizenship, helpMessage, name1, name2, occupation1, occupation2, address1, address2, number1, number2, email1, email2 });
            await data.save();
            
            const mailOptions = {
                from: process.env.MAIL_SENDER,
                to: `${data.email}, ${process.env.MAIL_SENDER}`, 
                subject: "Dear Friend, Thanks for your valuable time and support in joining the social cause.",
                text: `
                email:${data.email}
                We have received your mail. 
                Our team will revert you.
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
                    mess: "New User Joined",
                    data: data
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
        let data = await join.find();
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
};

const deleteRecord = async (req, res) => {
    try {
        let data = await join.findOne({ _id: req.params._id });
        await data.deleteOne();
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
