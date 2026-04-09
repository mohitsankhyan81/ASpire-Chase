import express from "express"
import pool from "./db/db"
import userrouter from "./router/user_router"
import dotenv from "dotenv"
import taskroute from "./router/task_router";
dotenv.config();
const app = express()
app.use(express.json())

try {
    pool.connect()
    console.log("Database connected")
} catch (error) {
    console.log("error in the database connection " + error)
}

app.use("/api/user", userrouter)
app.use("/api/task", taskroute);
app.listen(3000, () => {
    console.log("server start 3000")
})