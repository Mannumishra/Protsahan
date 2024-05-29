const join = require("../Model/JoinusSchema")

const createRecord = async (req, res) => {
    try {
        // console.log(req.body)
        let { title, firstName, lastName, dob, panNo, email, mobile, address, country, state, city, pinCode, citizenship, helpMessage, name1, name2, address1, address2, occupation1, occupation2, number1, number2, email1, email2 } = req.body
        if (!title || !firstName || !lastName || !dob || !panNo || !email || !mobile || !address || !country || !state || !city || !pinCode || !citizenship || !helpMessage) {
            return res.status(403).json({
                success: false,
                mess: "Fill all  required fields"
            })
        }
        else {
            const data = new join({ title, firstName, lastName, dob, panNo, email, mobile, address, country, state, city, pinCode, citizenship, helpMessage, name1, name2, occupation1, occupation2, address1, address2, number1, number2, email1, email2 })
            await data.save()
            res.status(200).json({
                success: true,
                mess: "New User Join",
                data: data
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal server Error"
        })
    }
}

const getRecord = async (req,res)=>{
    try {
        let data = await join.find()
        res.status(200).json({
            success:true,
            mess:"Record found",
            data:data
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            mess:"Internal Server Error"
        })
    }
}

const deleteRecord = async (req,res)=>{
    try {
        let data = await join.findOne({_id:req.params._id})
       await data.deleteOne()
        res.status(200).json({
            success:true,
            mess:"Record Deleted"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            mess:"Internal Server Error"
        })
    }
}
module.exports = {
    createRecord:createRecord,
    getRecord:getRecord,
    deleteRecord:deleteRecord
}