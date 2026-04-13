import axios from "axios";
import {Eye,EyeOff} from "lucide-react"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigator=useNavigate();
    interface Userinfo{
        name:string;
        email:string;
        password:string;
    }
    const [showpassword,setshowpassword]=useState(false)
    const [formdata,setformdata]=useState<Userinfo>({
        name:"",
        email:"",
        password:""
    });

    const handlechange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target

        setformdata((prev)=>({
            ...prev,
            [name]:value
        }))
    }
    const handlesubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
            const {data}=await axios.post("http://localhost:3000/api/user/signup",
                formdata,
                {
                    withCredentials:true
                }
            );
            console.log(data);
            navigator("/login");
        }
        catch(error){
            console.log(error)
            }
        }
  return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">

        <div className="hidden md:flex flex-col mr-10 max-w-sm">
            <h1 className="text-5xl font-bold text-purple-400">
            CH<span className="text-yellow-300">aSE</span>rs
            </h1>
            <p className="text-gray-400 mt-3 text-lg">
            Chasers is the platform where you chase your dreams.
            </p>
        </div>

        <form
            onSubmit={handlesubmit}
            className="bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-md space-y-5"
        >
            <h2 className="text-2xl font-semibold text-center text-white">
            Sign Up
            </h2>

            <input
            type="text"
            name="name"
            placeholder="User Name"
            value={formdata.name}
            onChange={handlechange}
            className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
            type="email"
            name="email"
            placeholder="User Email"
            value={formdata.email}
            onChange={handlechange}
            className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="relative">
            <input
                type={showpassword ? "text" : "password"}
                name="password"
                placeholder="Create Password"
                value={formdata.password}
                onChange={handlechange}
                className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
                type="button"
                onClick={() => setshowpassword(!showpassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
            >
                {!showpassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            </div>

            <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition duration-200"
            >
            Sign Up
            </button>

            <p className="text-gray-400 text-center text-sm">
            Already have an account?{" "}
            <span className="text-purple-400 hover:underline cursor-pointer">
                Login
            </span>
            </p>

        </form>
        </div>
  )
}

export default Register
