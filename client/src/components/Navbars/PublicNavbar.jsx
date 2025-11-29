///////////////////////////2
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = (
    <>
      <NavLink
        to="/"
        onClick={() => setIsOpen(false)} // Close menu on click
        className={({ isActive }) =>
          `py-2 md:py-0 px-3 rounded-lg transition-colors duration-200 ${
            isActive
              ? "bg-orange-500/20 text-orange-400 font-bold border-b-2 border-orange-500" // BRAND ACCENT
              : "text-gray-300 hover:text-yellow-300 hover:bg-gray-800 md:hover:bg-transparent"
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/login"
        onClick={() => setIsOpen(false)}
        className={({ isActive }) =>
          `py-2 md:py-0 px-3 rounded-lg transition-colors duration-200 ${
            isActive
              ? "bg-orange-500/20 text-orange-400 font-bold border-b-2 border-orange-500" // BRAND ACCENT
              : "text-gray-300 hover:text-yellow-300 hover:bg-gray-800 md:hover:bg-transparent"
          }`
        }
      >
        Add Team
      </NavLink>
      
    </>
  );

  return (
    <nav className="bg-gray-900 border-b border-orange-500/50 text-white px-4 md:px-8 py-4 flex items-center justify-between shadow-2xl sticky top-0 z-50">
      <h1
        className="font-extrabold text-2xl md:text-xl lg:text-3xl text-center
            text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"
      >
        Menschen-Cup
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-1 lg:space-x-8">
        {navLinks}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-orange-400 hover:text-orange-300 transition-colors duration-200" // BRAND ACCENT
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
      >
        {/* Icon remains the same */}
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-gray-900 border-t border-orange-500/50 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen py-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col space-y-2 px-4">{navLinks}</div>
      </div>
    </nav>
  );
}
