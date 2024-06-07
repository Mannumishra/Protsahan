const Image = require("../Model/ImageGallery");
const cloudinary = require('cloudinary').v2;
const path = require('path');
const multer = require('multer');
const fs = require('fs/promises');

// Define storage settings for multer
const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../uploads'); // Adjust the path as needed
        try {
            await fs.mkdir(uploadDir, { recursive: true }); // Ensure the directory exists
            cb(null, uploadDir); // Set the upload directory
        } catch (error) {
            cb(error, null); // Pass any error to multer
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).array('images', 10);

cloudinary.config({
    cloud_name: "dglihfwse",
    api_key: "939345957566958",
    api_secret: "q-Pg0dyWquxjatuRb62-PtFzkM0"
});



const createRecord = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({
                    success: false,
                    error: "File upload failed",
                    details: err.message
                });
            } else if (err) {
                return res.status(500).json({
                    success: false,
                    error: "Internal Server Error",
                    details: err.message
                });
            }
            
            const { title, description } = req.body;
            if (!title || !description) {
                return res.status(400).json({
                    success: false,
                    error: "Please fill all fields"
                });
            }

            try {
                const AllImagesUrls = [];
                for (let index = 0; index < req.files.length; index++) {
                    const file = req.files[index];
                    const safePublicId = file.originalname.replace(/[^a-zA-Z0-9_-]/g, '_'); // Replace spaces and special characters
                    const uploadResult = await cloudinary.uploader.upload(file.path, {
                        folder: 'gallery',
                        public_id: safePublicId // Use sanitized public_id
                    });
                    AllImagesUrls.push(uploadResult.secure_url);
                }

                const data = new Image({
                    title,
                    description,
                    images: AllImagesUrls // Store all images in an array field in MongoDB schema
                });

                // Save the record to MongoDB
                await data.save();

                res.status(200).json({
                    success: true,
                    message: "Gallery Created",
                    data: data
                });
            } catch (error) {
                console.error("Error uploading images to Cloudinary:", error);
                res.status(500).json({
                    success: false,
                    error: "Error uploading images to Cloudinary",
                    details: error.message
                });
            }
        });
    } catch (error) {
        console.error("Error in createRecord function:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
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
