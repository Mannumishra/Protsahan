const express = require("express")
const jobrouter = require("./Routes/JobRouter")
const cors = require("cors")
const contactrouter = require("./Routes/ContactRouter")
const joinrouter = require("./Routes/JoinRouter")
const volunterRouter = require("./Routes/Volunteer")
const empRouter = require("./Routes/EmpRouter")
require("dotenv").config()
require("./Db/ConnectDb")

const app = express()

app.use(express.json())
app.set(express.static("./Public"))
app.use(cors())
app.use("/api", jobrouter)
app.use("/api", contactrouter)
app.use("/api", joinrouter)
app.use("/api", volunterRouter)
app.use("/api", empRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is Running at ${process.env.PORT}.`)
})