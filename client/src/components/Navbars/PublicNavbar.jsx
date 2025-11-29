import React from "react";
import { NavLink } from "react-router-dom";
import { Trophy, LogIn } from "lucide-react"; // icons!

function PublicNavbar() {
  return (
    <nav
      className="
        backdrop-blur-md bg-gray-900/40 
        border-b border-orange-500/30 
        py-4 px-4 md:px-8 
        flex justify-between items-center 
        sticky top-0 z-40 shadow-xl
      "
    >
      {/* Logo / Title */}
      <div className="flex items-center gap-2">
        <Trophy className="text-orange-400 w-7 h-7 drop-shadow" />
        
        <NavLink
          to="/"
          className="font-extrabold text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"
        >
          Menschen-Cup
        </NavLink>
      </div>

      {/* Links */}
      <NavLink
        to="/login"
        className="
          px-4 py-3 rounded-full font-medium 
          bg-gradient-to-r from-yellow-400 to-orange-500 
          text-gray-900 
          flex items-center gap-2
          hover:brightness-110 hover:shadow-lg transition-all
        "
      >
        <LogIn className="w-5 h-5" />
        Login/SignUp
      </NavLink>
    </nav>
  );
}

export default PublicNavbar;
