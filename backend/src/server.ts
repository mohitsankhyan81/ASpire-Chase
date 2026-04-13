import express from "express"
import pool from "./db/db"
import userrouter from "./router/user_router"
import dotenv from "dotenv"
import taskroute from "./router/task_router";
import cors,{CorsOptions} from "cors"
dotenv.config();
const app = express()
app.use(express.json())

const corsOptions:CorsOptions={
    origin: process.env.FRONT_END,
    credentials: true
}

app.use(cors(corsOptions));

try {
    pool.connect()
    console.log("Database connected")
} catch (error) {
    console.log("error in the database connection " + error)
}

app.use("/api/user", userrouter)
app.use("/api/task", taskroute);

const PORT=process.env.PORT||3000;
app.listen(PORT, () => {
    console.log("server start 3000")
})