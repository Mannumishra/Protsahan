const volunteer = require("../Model/VolunteerSchema")

const createRecord = async (req, res) => {
    try {
        // console.log(req.body)
        let { donation, sirName, firstName, lastName, dob, panNo, email, mobile, address, country, state, city, pinCode, citizenship, helpMessage } = req.body
        if (!donation || !sirName || !firstName || !lastName || !dob || !panNo || !email || !mobile || !address || !country || !state || !city || !pinCode || !citizenship || !helpMessage) {
            return res.status(403).json({
                success: false,
                mess: "Fill all  required fields"
            })
        }
        else {
            const data = new volunteer({ donation, sirName, firstName, lastName, dob, panNo, email, mobile, address, country, state, city, pinCode, citizenship, helpMessage })
            await data.save()
            res.status(200).json({
                success: true,
                mess: "New User Join",
                data: data
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            mess: "Internal server Error"
        })
    }
}

const getRecord = async (req, res) => {
    try {
        let data = await volunteer.find()
        res.status(200).json({
            success: true,
            mess: "Record found",
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
        let data = await volunteer.findOne({ _id: req.params._id })
        await data.deleteOne()
        res.status(200).json({
            success: true,
            mess: "Record deleted"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}

module.exports = {
    createRecord: createRecord,
    getRecord: getRecord,
    deleteRecord:deleteRecord
}