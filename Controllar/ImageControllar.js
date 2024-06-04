const Image = require("../Model/ImageGallery");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "dglihfwse",
    api_key: "939345957566958",
    api_secret: "q-Pg0dyWquxjatuRb62-PtFzkM0"
});

const uploadImage = async (file) => {
    try {
        let uploadResult = await cloudinary.uploader.upload(file);
        return uploadResult.secure_url;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const createRecord = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(403).json({
                success: false,
                mess: "Please fill all fields"
            });
        }

        const data = new Image({ title, description });
        for (let i = 1; i <= 10; i++) {
            const fieldName = `image${i}`;
            if (req.files && req.files[fieldName]) {
                const url = await uploadImage(req.files[fieldName][0].path);
                data[fieldName] = url;
            }
        }
        await data.save();
        res.status(200).json({
            success: true,
            mess: "Gallery Created",
            data: data
        });
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
        let data = await Image.find()
        res.status(200).json({
            success: true,
            mess: "Record Found",
            data: data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        });
    }
}

const getSingleRecord = async (req, res) => {
    try {
        let data = await Image.findOne({ _id: req.params._id })
        res.status(200).json({
            success: true,
            mess: "Record Found",
            data: data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        });
    }
}

const deleteRecord = async (req, res) => {
    try {
        let data = await Image.findOne({ _id: req.params._id })
        if (data) {
            for (let i = 1; i <= 10; i++) {
                const fieldName = `image${i}`;
                if (data[fieldName]) {
                    await cloudinary.uploader.destroy(data[fieldName].split('/').pop())
                }
            }
            await data.deleteOne()
            res.status(200).json({
                success: true,
                mess: "Record deletd successfully"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        });
    }
}

const updateRecord = async (req, res) => {
    try {
        let data = await Image.findOne({ _id: req.params._id })
        if (data) {
            data.title = req.body.title ?? data.title
            data.description = req.body.description ?? data.description
            for (let i = 1; i <= 10; i++) {
                const fieldName = `image${i}`;
                if (req.files && req.files[fieldName]) {
                    const file = req.files[fieldName][0];
                    const uploadResult = await cloudinary.uploader.upload(file.path);
                    if (data[fieldName]) {
                        await cloudinary.uploader.destroy(data[fieldName].split('/').pop());
                    }
                    data[fieldName] = uploadResult.secure_url;
                }
            }
            await data.save()
            res.status(200).json({
                success: true,
                mess: "Record Found",
                data: data
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        });
    }
}


module.exports = {
    createRecord: createRecord,
    getRecord: getRecord,
    getSingleRecord: getSingleRecord,
    deleteRecord: deleteRecord,
    updateRecord: updateRecord
};
