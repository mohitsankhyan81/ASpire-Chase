import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  interface userInfo {
    email: string;
    password: string;
  }

  const [showpassword, setshowpassword] = useState(false);

  const [formdata, setformdata] = useState<userInfo>({
    email: "",
    password: ""
  });

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setformdata((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/user/login",
        formdata,
        { withCredentials: true }
      );

      console.log(data);
      navigate("/");

    } catch (error) {
      console.log(error);
    }
  };

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
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formdata.email}
          onChange={handlechange}
          className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <div className="relative">
          <input
            type={showpassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
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
          Login
        </button>

        <p className="text-gray-400 text-center text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-purple-400 hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;