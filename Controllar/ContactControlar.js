const contact = require("../Model/ContactSchema");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "info@prothsahanteam.org",
        pass: "Info@1234",
    },
});

const createContact = async (req, res) => {
    try {
        let { name, email, subject, message, city, country, number, address } = req.body;

        if (!name || !email || !subject || !message || !city || !country || !number || !address) {
            return res.status(403).json({
                success: false,
                mess: "Fill All Required Fields",
            });
        }

        const data = new contact({ name, email, subject, message, city, country, number, address });
        await data.save();

        const mailOptions = {
            from: "info@prothsahanteam.org",
            to: process.env.MAIL_SENDER,
            subject: "Dear Friend, Thanks for your valuable time and support in joining the social cause.",
            text: `
                email: ${email}
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
                mess: "Contact Created Successfully",
                data: data,
            });
        });

    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({
            success: false,
            mess: "Internal Server Error",
            error: error.message,
        });
    }
};

const getRecord = async (req, res) => {
    try {
        let data = await contact.find();
        res.status(200).json({
            success: true,
            mess: "Record found",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error",
        });
    }
};

const deleteRecord = async (req, res) => {
    try {
        let data = await contact.findOne({ _id: req.params._id });
        if (data) {
            await data.deleteOne();
        }
        res.status(200).json({
            success: true,
            mess: "Record deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error",
        });
    }
};

module.exports = {
    createContact: createContact,
    getRecord: getRecord,
    deleteRecord: deleteRecord,
};
