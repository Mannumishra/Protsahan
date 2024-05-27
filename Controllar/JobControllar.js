const jobdetails = require("../Model/JobSchema")

const createJob = async (req, res) => {
    try {
        console.log("i am hit", req.body)
        const { jobpost, experience, qualification, packageanual, organisationname, address, state, city, pincode, contact, mobile, email } = req.body
        if (!jobpost || !experience || !qualification || !packageanual || !organisationname || !address || !state || !city || !pincode || !contact || !mobile || !email) {
            return res.status(403).json({
                success: false,
                mess: "Fill are fields"
            })
        }
        const data = new jobdetails({ jobpost, experience, qualification, packageanual, organisationname, address, state, city, pincode, contact, mobile, email })
        // const data = new jobdetails(req.body)
        await data.save()
        res.status(200).json({
            success: true,
            mess: "Job Post SuccessFully",
            data: data
        })
    } catch (error) {
        console.log(error)
    }
}

const getRecord = async (req, res) => {
    try {
        let data = await jobdetails.find()
        res.status(200).json({
            success: true,
            mess: "Record Found",
            data: data
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createJob: createJob,
    getRecord:getRecord
}