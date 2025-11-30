import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosBase from "../../api/axiosBase";
import { Eye, EyeOff } from "lucide-react";

function AdminRegister() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !secret)
      return alert("please fill all fields");

    if (password.length < 8)
      return alert("password must be at least 8 characters");

    setIsLoading(true);

    try {
      const res = await axiosBase.post("/users/create-admin", {
        username,
        email,
        password,
        secret,
      });

      alert(res.data.message);

      setUsername("");
      setEmail("");
      setPassword("");
      setSecret("");
      setShowPassword(false);

      navigate("/login");
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

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

      {/* FORM */}
      <div className="bg-gray-800 w-full max-w-lg p-8 md:p-10 rounded-xl shadow-2xl border border-orange-500/30">
        <h2 className="text-2xl font-bold mb-6 text-orange-400 flex items-center">
          <svg className="w-6 h-6 mr-2 fill-current" viewBox="0 0 24 24">
            <path
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4S8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 
            0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            />
          </svg>
          Register as an Admin
        </h2>

        <form onSubmit={handleSubmit}>
          {/* USERNAME */}
          <div className="flex flex-col gap-1 mb-5">
            <label className="font-medium text-gray-300">User Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="user name"
              disabled={isLoading}
              className="p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
            />
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-1 mb-5">
            <label className="text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              disabled={isLoading}
              className="p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
                className="w-full p-3 pr-12 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-400 hover:text-orange-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* secret key */}
            <div className="flex flex-col gap-1 my-7">
              <label className="text-sm font-medium text-gray-300">Secret</label>
              <input
                type="text"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="you know what I mean"
                disabled={isLoading}
                className="p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
              />
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-orange-600 transition duration-200
            transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Registering..." : "Submit"}
          </button>
        </form>

      </div>
    </div>
  );
}

export default AdminRegister;
