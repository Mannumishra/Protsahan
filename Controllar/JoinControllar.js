const join = require("../Model/JoinusSchema");
const nodemailer = require("nodemailer");

// Mail transporter for general emails
const transporterGeneral = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
        user: "info@prothsahanteam.org",
        pass: "Info@1234",
    },
});

// Mail transporter for notifications or specific emails
const transporterNotifications = nodemailer.createTransport({
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
        let { title, firstName, lastName, dob, qualification, collegename, email, mobile, address, country, state, city, pinCode, citizenship, helpMessage, name1, name2, address1, address2, occupation1, occupation2, number1, number2, email1, email2 ,intersted } = req.body;

        // Validate required fields
        if (!title || !firstName || !lastName || !dob || !qualification || !collegename || !email || !mobile || !address || !country || !state || !city || !pinCode || !citizenship || !helpMessage || !intersted) {
            return res.status(403).json({
                success: false,
                mess: "Fill all required fields"
            });
        }

        // Create a new record
        const data = new join({ title, firstName, lastName, dob, qualification, collegename, email, mobile, address, country, state, city, pinCode, citizenship, helpMessage, name1, name2, occupation1, occupation2, address1, address2, number1, number2, email1, email2 ,intersted});
        await data.save();

        // Mail options for general email
        const mailOptionsGeneral = {
            from: process.env.MAIL_SENDER,
            to: data.email,
            subject: "Dear Friend, Thanks for your valuable time and support in joining the social cause.",
            text: ` 
                We have received your mail. 
                Our team will revert to you.
                Best wishes,
                Jai Hind
                Vivek Vashistha
                President
            `,
        };

        // Mail options for notifications email
        const mailOptionsNotifications = {
            from: process.env.MAIL_SENDER,
            to: process.env.MAIL_SENDER,
            subject: "New User Joined - Notification",
            text: `
                 A new user has joined:
                Title: ${data.title}
                First Name: ${data.firstName}
                Last Name: ${data.lastName}
                Date of Birth: ${data.dob}
                Qualification: ${data.qualification}
                College Name: ${data.collegename}
                Email: ${data.email}
                Mobile: ${data.mobile}
                Address: ${data.address}
                Country: ${data.country}
                State: ${data.state}
                City: ${data.city}
                Pin Code: ${data.pinCode}
                Citizenship: ${data.citizenship}
                intersted : ${data.intersted}
                Help Message: ${data.helpMessage}

                       Refrence First
                Refrence Name 1: ${data.name1}
                Refrence Address 1: ${data.address1}            
                Refrence Occupation 1: ${data.occupation1}
                Refrence Number 1: ${data.number1}
                  Refrence Email 1: ${data.email1}

                        Refrence Second
                Refrence Name 2: ${data.name2}
                Refrence Address 2: ${data.address2}
                Refrence Occupation 2: ${data.occupation2}
                Refrence Number 2: ${data.number2}
                Refrence Email 2: ${data.email2}
            `,
        };

        // Send general email
        transporterGeneral.sendMail(mailOptionsGeneral, (error, info) => {
            if (error) {
                console.error("Error sending general email:", error);
                return res.status(500).json({
                    success: false,
                    mess: "Error sending general email",
                    error: error.message,
                });
            }
            console.log("General Email sent:", info.response);
        });

        // Send notifications email
        transporterNotifications.sendMail(mailOptionsNotifications, (error, info) => {
            if (error) {
                console.error("Error sending notifications email:", error);
                return res.status(500).json({
                    success: false,
                    mess: "Error sending notifications email",
                    error: error.message,
                });
            }
            console.log("Notifications Email sent:", info.response);
        });

        // Respond with success message after sending emails
        res.status(200).json({
            success: true,
            mess: "New User Joined",
            data: data
        });
    } catch (error) {
        console.error("Error creating record:", error);
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        });
    }
};

const getRecord = async (req, res) => {
    try {
        // Fetch all records from the database
        let data = await join.find();
        res.status(200).json({
            success: true,
            mess: "Records found",
            data: data
        });
    } catch (error) {
        console.error("Error fetching records:", error);
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        });
    }
};

const deleteRecord = async (req, res) => {
    try {
        // Find the record by _id and delete it
        let data = await join.findOne({ _id: req.params._id });
        if (!data) {
            return res.status(404).json({
                success: false,
                mess: "Record not found"
            });
        }
        await data.deleteOne();
        res.status(200).json({
            success: true,
            mess: "Record Deleted"
        });
    } catch (error) {
        console.error("Error deleting record:", error);
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
