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
      <div className="mx-auto md:flex max-w-screen-lg items-center justify-evenly md:flex-row md:justify-between">
        <div className="flex mb-10 md:mb-0 md:w-1/4 flex-col items-center">
          <Logo colorClass="text-violet-400" />
          <div className="mt-2 flex gap-3">
            <FaFacebook size={24} />
            <FaInstagram size={24} />
            <FaSnapchat size={24} />
          </div>
        </div>

        <div className="flex-3 text-center">
          <ul className="flex flex-col gap-2 md:text-start text-xl uppercase md:flex-row md:gap-6">
            {isLoggedIn() ? (
              <NavLink
                to="/profile"
                className="hover:font-bold hover:text-violet-400"
              >
                Profile
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className="hover:font-bold hover:text-violet-400"
              >
                Login
              </NavLink>
            )}
            <NavLink to="/" className="hover:font-bold hover:text-violet-400">
              Home
            </NavLink>
            <NavLink
              to="/listings"
              className="hover:font-bold hover:text-violet-400"
            >
              Listings
            </NavLink>
            <NavLink
              to="/about"
              className="hover:font-bold hover:text-violet-400"
            >
              About
            </NavLink>
          </ul>
        </div>

        <div className="hidden w-1/4 flex-col justify-center md:flex">
          {/* Flex container for Subscribe */}
          <p className="text-sm">Subscribe to Holidaze</p>
          <form action="" className="mt-2 flex gap-1">
            {/* Align Subscribe and input button horizontally */}
            <input
              type="email"
              className="w-36 rounded-full border bg-white focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full border border-violet-300 bg-violet-700 px-3 py-1 text-sm font-semibold uppercase text-white hover:bg-gradient-to-t hover:from-orange-300 hover:to-orange-400 hover:text-black"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="mt-6 text-center text-sm md:mt-3">
        &copy; 2024 Designed by Charlotte Lund
      </div>
    </div>
  );
};

export default Footer;
