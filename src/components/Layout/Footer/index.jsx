import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo";

import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSnapchat } from "react-icons/fa6";

export function isLoggedIn() {
  const userToken = localStorage.getItem("accessToken");
  return !!userToken;
}

const Footer = () => {
  return (
    <div className="bg-zinc-700 p-6 text-white">
      <div className="flex md:flex-row justify-evenly md:justify-between items-center">
        <div className="flex flex-col w-1/4 items-center">
          <Logo colorClass="text-violet-400" />
          <div className="flex gap-3 mt-2">
            <FaFacebook size={24} />
            <FaInstagram size={24} />
            <FaSnapchat size={24} />
          </div>
        </div>

        <div className="text-center flex-3">
          <ul className="flex flex-col text-start md:flex-row md:gap-6 gap-2 uppercase text-xl">
          {isLoggedIn() ? (
              <NavLink
                to="/profile"
                className="hover:text-violet-400 hover:font-bold"
              >
                Profile
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className="hover:text-violet-400 hover:font-bold"
              >
                Login
              </NavLink>
    )}
            <NavLink to="/" className="hover:text-violet-400 hover:font-bold">
              Home
            </NavLink>
            <NavLink
              to="/listings"
              className="hover:text-violet-400 hover:font-bold"
            >
              Listings
            </NavLink>
            <NavLink
              to="/about"
              className="hover:text-violet-400 hover:font-bold"
            >
              About
            </NavLink>
      
        
          </ul>
        </div>

        <div className="hidden md:flex flex-col justify-center w-1/4">
          {/* Flex container for Subscribe */}
          <p className="text-sm uppercase">Subscribe to Holidaze</p>
          <form action="" className="flex gap-1 mt-2">
            {/* Align Subscribe and input button horizontally */}
            <input
              type="email"
              className="border bg-white rounded-full w-36 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-violet-700 border hover:bg-gradient-to-t hover:from-orange-300 hover:to-orange-400 hover:text-black border-violet-300 text-white py-1 px-3 text-sm font-semibold uppercase"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="text-center text-sm mt-6 md:mt-3">
        &copy; 2024 Designed by Charlotte Lund
      </div>
    </div>
  );
};

export default Footer;
