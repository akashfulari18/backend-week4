const express = require("express")
const connection = require("./db")
const auth = require("./middleware/auth.middleware")
const noteRouter = require("./routes/note.route")
const userRoute = require("./routes/user.route")
require("dotenv").config()
const cors = require('cors')
const app =express()
app.use(cors())

app.use(express.json())

app.use("/users",userRoute)
app.use(auth)
app.use("/notes",noteRouter)

app.listen(process.env.port,async()=>{

    try {
        await connection
        console.log("Connected...")
    } catch (err) {
        console.log("connection failed!")
    }
    console.log(`Server is running at port ${process.env.port}`)
})