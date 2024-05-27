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
        res.status(500).json({
            success: false,
            mess: "Internal Server Error",
            data: data
        })
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
        res.status(500).json({
            success: false,
            mess: "Internal Server Error",
            data: data
        })
    }
}
const getSingleRecord = async (req, res) => {
    try {
        let data = await jobdetails.findOne({ _id: req.params._id })
        res.status(200).json({
            success: true,
            mess: "Record Found",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error",
            data: data
        })
    }
}
const updateJob = async (req, res) => {
    try {
        let data = await jobdetails.findOne({ _id: req.params._id })
        if (data) {
            data.jobpost = req.body.jobpost ?? data.jobpost
            data.experience = req.body.experience ?? data.experience
            data.qualification = req.body.qualification ?? data.qualification
            data.packageanual = req.body.packageanual ?? data.packageanual
            data.organisationname = req.body.organisationname ?? data.organisationname
            data.address = req.body.address ?? data.address
            data.state = req.body.state ?? data.state
            data.pincode = req.body.pincode ?? data.pincode
            data.contact = req.body.contact ?? data.contact
            data.mobile = req.body.mobile ?? data.mobile
            data.email = req.body.email ?? data.email
            await data.save()
            res.status(200).json({
                success: true,
                mess: "Job Post updated successfully",
                data: data
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error",
            data: data
        })
    }
}

const deleteJob = async (req, res) => {
    try {
        let data = await jobdetails.findOne({ _id: req.params._id })
        await data.deleteOne()
        res.status(200).json({
            success: true,
            mess: "Job Deleted Successfully",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error",
            data: data
        })
    }
}

module.exports = {
    createJob: createJob,
    getRecord: getRecord,
    updateJob: updateJob,
    getSingleRecord: getSingleRecord,
    deleteJob:deleteJob
}