const contact = require("../Model/ContactSchema")

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


module.exports = {
    createContact: createContact
}