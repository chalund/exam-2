import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { IoClose, IoConstructOutline } from "react-icons/io5";

export function isLoggedIn() {
  const userToken = localStorage.getItem("accessToken");
  return !!userToken;
}

const NavLinks = ({ isOpen }) => {
  return (
    <>
      {isOpen && isLoggedIn() && (
        <NavLink
          to="/profile"
          className="mb-2 p-2 text-xl uppercase hover:bg-violet-600 hover:text-white md:hover:bg-zinc-50 md:hover:font-bold md:hover:text-violet-600"
        >
          Profile
        </NavLink>
      )}
      <NavLink
        to="/"
        className="mb-2 p-2 text-xl uppercase hover:bg-violet-600 hover:text-white md:hover:bg-zinc-50 md:hover:font-bold md:hover:text-violet-600"
      >
        Home
      </NavLink>
      <NavLink
        to="/listings"
        className="mb-2 p-2 text-xl  uppercase hover:bg-violet-600 hover:text-white md:hover:bg-zinc-50 md:hover:font-bold md:hover:text-violet-600"
      >
        Venues
      </NavLink>
      <NavLink
        to="/about"
        className="p-2 text-xl  uppercase hover:bg-violet-600 hover:text-white  md:hover:bg-zinc-50 md:hover:font-bold md:hover:text-violet-600"
      >
        About
      </NavLink>
    </>
  );
};

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <>
      <nav className="flex justify-end">
        <div className="mt-2 hidden w-full justify-between md:flex ">
          <NavLinks isOpen={true} />
        </div>

        <div className="ms-4 flex items-center space-x-2">
          {isLoggedIn() ? (
            <button
              onClick={handleLogout}
              className="mr-3 rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-4 py-2 font-semibold uppercase hover:from-orange-400 hover:to-orange-500 hover:text-white md:mr-0"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="mr-3 rounded-full bg-violet-600 px-4 py-2 font-semibold uppercase text-white md:mr-0"
            >
              Login
            </NavLink>
          )}
        </div>
        <div className="mr-1 flex py-2 md:hidden">
          <button onClick={toggleNavbar}>
            {isOpen ? <IoClose size={30} /> : <HiOutlineMenu size={30} />}
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="mt-4 flex basis-full flex-col md:hidden">
          <NavLinks isOpen={isOpen} />
        </div>
      )}
    </>
  );
};

export default Nav;
