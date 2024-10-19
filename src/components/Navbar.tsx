import React from "react";
import { NavLink } from "react-router-dom";
import { User } from "../context/AuthContext";

const Navbar = ({
  user,
  handleLogout,
}: {
  user: User;
  handleLogout: () => void;
}) => {
  return (
    <nav className="bg-white shadow-md sticky top-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-2xl font-semibold ">
          {`Welcome! ${user?.name}`}
        </span>

        <div>
          <ul className="font-medium md:flex-row md:space-x-8">
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive ? "md:text-blue-700" : "text-gray-900"
                } md:hover:text-blue-700`
              }
              to="/dashboard/users"
            >
              Users
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive ? "md:text-blue-700" : "text-gray-900"
                } md:hover:text-blue-700`
              }
              to="/dashboard/resources"
            >
              Resources
            </NavLink>
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4  rounded-lg text-sm px-5 py-2.5"
              onClick={handleLogout}
            >
              Logout
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
