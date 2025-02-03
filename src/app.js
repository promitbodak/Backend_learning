import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// Express App Configuration -----vvv----- 

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



// ROUTES --vvvvvvvvvvvvv
import userRouter from "./routes/user.routes.js"

// ROUTES DECLARATION
app.use("/api/v1/users", userRouter)

export {app}