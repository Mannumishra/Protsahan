const contact = require("../Model/ContactSchema")
const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.MAIL_SENDER,
        pass: process.env.MAIL_PASS
    }
})

const createContact = async (req, res) => {
    try {
        let { name, email, subject, message, city, country, number, address } = req.body
        if (!name || !email || !subject || !message || !city || !country || !number || !address) {
            return res.status(403).json({
                success: false,
                mess: "Fill All Required Filelds"
            })
        }
        const data = new contact({ name, email, subject, message, city, country, number, address })
        console.log(email)
        mailOptions = {
            from: email,
            to: process.env.MAIL_SENDER,
            subject: "A New Contact Query Recieve ",
            text: `
            Name ${data.name}
            subject ${data.subject}
            message ${data.message}
            city ${data.city}
            country ${data.country}
            number ${data.number}
            address ${data.address}
                  `
        }
        transporter.sendMail(mailOptions, ((error) => {
            if (error) {
                console.log(error)
            }
        }))
        await data.save()
        res.status(200).json({
            success: true,
            mess: "Contact Created Successfully",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}

const getRecord = async (req, res) => {
    try {
        let data = await contact.find()
        res.status(200).json({
            success: true,
            mess: "record found",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}

const deleteRecord = async (req, res) => {
    try {
        let data = await contact.findOne({ _id: req.params._id })
        await data.deleteOne()
        res.status(200).json({
            success: true,
            mess: "record deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}

module.exports = {
    createContact: createContact,
    getRecord: getRecord,
    deleteRecord: deleteRecord
}