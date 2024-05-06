import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo";

import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSnapchat } from "react-icons/fa6";




const Footer = () => {
  return (
    <div className="bg-zinc-700 p-6 text-white">
    <div className="flex justify-between items-center">
      <div className="flex flex-col w-1/4 items-center">
      <Logo colorClass="text-violet-400" />

        <div className="flex gap-3 mt-2">
          <FaFacebook size={24} />
          <FaInstagram size={24} />
          <FaSnapchat size={24} />
        </div>
      </div>

      <div className="text-center flex-3"> {/* Flex-1 to make this div take remaining space */}
        <ul className="flex gap-6 uppercase text-xl">
          <NavLink>Home</NavLink>
          <NavLink>Listings</NavLink>
          <NavLink>About</NavLink>
          <NavLink>Login</NavLink>
        </ul>
      </div>

      <div className="flex flex-col  justify-center w-1/4"> {/* Flex container for Subscribe */}
        <p className="text-sm uppercase">Subscribe to Holidaze</p>
        <form action="" className="flex gap-1 mt-2"> {/* Align Subscribe and input button horizontally */}
          <input
            type="email"
            className="border bg-white rounded-full w-36"
          />
          <button
            type="submit"
            className="rounded-full bg-violet-700 border border-violet-300 text-white py-1 px-3 text-sm font-semibold uppercase "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    <div className="text-center mt-3">
      &copy; 2024 Designed by Charlotte Lund
    </div>
  </div>
  );
};

export default Footer;
