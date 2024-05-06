import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { IoClose, IoConstructOutline } from "react-icons/io5";

export function isLoggedIn() {
  const userToken = localStorage.getItem("accessToken");
  return !!userToken;
}
const NavLinks = ({ isOpen }) => {
  const { pathname } = useLocation();

  // Function to determine if a NavLink should be active
  const isActiveNavLink = (path) => {
    return pathname === path ? "text-violet-700 font-bold" : "text-black";
  };

  console.log(pathname)

  return (
    <>
      {isOpen && isLoggedIn() && (
        <NavLink
          to="/profile"
          className={`mb-2 p-2 text-xl uppercase md:text-lg md:px-4 hover:bg-violet-700 hover:text-white md:hover:bg-zinc-50 md:hover:font-bold md:hover:text-violet-700 ${isActiveNavLink("/profile")}`}
        >
          Profile
        </NavLink>
      )}
<NavLink
  to="/"
  className={`mb-2 p-2 text-xl uppercase md:text-lg md:px-4 hover:bg-violet-700 hover:text-white md:hover:bg-zinc-50 md:hover:font-bold md:hover:text-violet-700 ${isActiveNavLink("/")}`}
  exact="true"
>
  Home
</NavLink>

<NavLink
  to="/listings"
  className={`mb-2 p-2 text-xl uppercase md:text-lg md:px-4 hover:bg-violet-700 hover:text-white md:hover:bg-zinc-50 md:hover:font-bold md:hover:text-violet-700 ${isActiveNavLink("/listings")}`}
>
  Venues
</NavLink>

      <NavLink
        to="/about"
        className={`p-2 text-xl uppercase md:text-lg md:px-4 hover:bg-violet-700 hover:text-white md:hover:bg-zinc-50 md:hover:font-bold md:hover:text-violet-700 ${isActiveNavLink("/about")}`}
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
    window.location.reload();
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
              className="mr-3 rounded-full bg-violet-700 px-4 py-2 font-semibold uppercase text-white md:mr-0"
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
