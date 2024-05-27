const express = require("express")
const jobrouter = require("./Routes/JobRouter")
const cors = require("cors")
require("dotenv").config()
require("./Db/ConnectDb")

const app = express()

app.use(express.json())
app.use(cors())
app.use("/api", jobrouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is Running at ${process.env.PORT}.`)
})