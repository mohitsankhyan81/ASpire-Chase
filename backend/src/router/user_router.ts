import express from "express"
import { signup } from "../controller/user_controller"
import {login } from "../controller/user_controller"; 

const userrouter = express.Router()

userrouter.post("/signup", signup)
userrouter.post("/login",login);

export default userrouter