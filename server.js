const express = require("express")
const jobrouter = require("./Routes/JobRouter")
const cors = require("cors")
const contactrouter = require("./Routes/ContactRouter")
const joinrouter = require("./Routes/JoinRouter")
const volunterRouter = require("./Routes/Volunteer")
const empRouter = require("./Routes/EmpRouter")
const eventRouter = require("./Routes/Eventrouter")
const galleryRouter = require("./Routes/GalleryRouter")
const dotenv = require('dotenv')
dotenv.config()
require("./Db/ConnectDb")

const app = express()

app.use(express.json())
app.set(express.static("./Public"))
app.use("/Public", express.static("Public"))
app.use(cors())
app.use("/api", jobrouter)
app.use("/api", contactrouter)
app.use("/api", joinrouter)
app.use("/api", volunterRouter)
app.use("/api", empRouter)
app.use("/api", eventRouter)
app.use("/api", galleryRouter)
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: "File too large. Maximum size is 5MB."
            });
        }
    } else if (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
    next();
});

app.listen(process.env.PORT, () => {
    console.log(`Server is Running at ${process.env.PORT}.`)
})