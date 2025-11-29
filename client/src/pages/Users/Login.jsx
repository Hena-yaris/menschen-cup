import React, { useState } from "react";
import axiosBase from "../../api/axiosBase";
import { useNavigate } from "react-router-dom";

import { Eye ,EyeOff } from "lucide-react";

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [isLoading , setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e)=> {
        e.preventDefault();

        if(!email || !password){
            return alert("please enter required filed")
        }

        if(password.length <8 ) {
            return alert("password must be at least 8 character")
        }
        setIsLoading(true);

        try {
           const res = await axiosBase.post("/users/login",{email,password}) 
           alert(res.data.message);

           setEmail("");
           setPassword("");
           return navigate("/")
            
        } catch (err) {
           console.log(err);
            alert(err.response?.data?.message || "Error login page");
 
        }finally{
            setIsLoading(false)
        }

    }
    
  


  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-start md:items-center flex-col gap-6 p-4 pt-20 md:pt-4">
      {/* BRAND CARD */}
      <div className="bg-gray-800 w-full max-w-lg p-6 rounded-xl border border-yellow-500/50 shadow-2xl">
        <h1
          className="font-extrabold text-3xl md:text-4xl text-center
          text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"
        >
          Menschen-Cup
        </h1>
      </div>

      {/* LOGIN FORM CARD */}
      <div className="bg-gray-800 w-full max-w-lg p-8 md:p-10 rounded-xl shadow-2xl border border-orange-500/30">
        <h2 className="text-2xl font-bold mb-6 text-orange-400 flex items-center">
          <svg className="w-6 h-6 mr-2 fill-current" viewBox="0 0 24 24">
            <path
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4S8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 
            0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            />
          </svg>
          Login Account
        </h2>

        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div className="flex flex-col gap-1 mb-5">
            <label className="text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          {/* PASSWORD */}
          <div className="flex flex-col gap-1 mb-8">
            <label className="text-sm font-medium text-gray-300">
              Password
            </label>

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full p-3 pr-12 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400
      focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-400 hover:text-orange-600 cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-orange-600 transition duration-200
            transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Extra Links */}
        <div className="text-center mt-6 text-gray-300">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-orange-400 font-semibold cursor-pointer hover:text-yellow-400 transition"
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
