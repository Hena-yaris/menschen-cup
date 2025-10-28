import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow-md sticky top-0 left-0  z-50">
      <h1 className="text-xl font-semibold">Menschen Cup</h1>

      <div className="flex gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-medium" : "hover:text-yellow-300"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/addteam"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-medium" : "hover:text-yellow-300"
          }
        >
          Add Team
        </NavLink>
        <NavLink
          to="/teamslist"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-medium" : "hover:text-yellow-300"
          }
        >
          Teams
        </NavLink>
        <NavLink
          to="/addmatch"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-medium" : "hover:text-yellow-300"
          }
        >
          Record Match
        </NavLink>
        <NavLink
          to="/fixtures"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-medium" : "hover:text-yellow-300"
          }
        >
          Fixtures
        </NavLink>
        <NavLink
          to="/knockout"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-medium" : "hover:text-yellow-300"
          }
        >
          Knockout
        </NavLink>
      </div>
    </nav>
  );
}
