import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { IoClose, IoConstructOutline } from "react-icons/io5";


export function isLoggedIn() {
  const userToken = localStorage.getItem('accessToken');
  return !!userToken;
}

const NavLinks = ({ isOpen }) => {
  return (
    <>
      {isOpen && isLoggedIn() && <NavLink to="/profile" className="uppercase mb-2 text-xl hover:bg-violet-600 hover:text-white p-2 md:hover:text-violet-600 md:hover:bg-zinc-50 md:hover:font-bold">Profile</NavLink>}
      <NavLink to="/" className="uppercase mb-2 text-xl hover:bg-violet-600 hover:text-white p-2 md:hover:text-violet-600 md:hover:bg-zinc-50 md:hover:font-bold">Home</NavLink>
      <NavLink to="/listings" className="uppercase mb-2 text-xl  hover:bg-violet-600 hover:text-white p-2 md:hover:text-violet-600 md:hover:bg-zinc-50 md:hover:font-bold">Venues</NavLink>
      <NavLink to="/about" className="uppercase text-xl  hover:bg-violet-600 hover:text-white p-2  md:hover:text-violet-600 md:hover:bg-zinc-50 md:hover:font-bold">About</NavLink>
    </>
  );
}

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  }

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  }

  return (
    <>
      <nav className="flex justify-end">
        <div className="hidden w-full justify-between md:flex mt-2 ">
          <NavLinks isOpen={true} />
        </div>
        
        <div className="flex items-center ms-4 space-x-2">
          {isLoggedIn() ? (
            <button onClick={handleLogout} className='bg-gradient-to-t from-orange-300 to-orange-400 hover:from-orange-400 hover:to-orange-500 hover:text-white px-4 py-2 rounded-full uppercase font-semibold mr-3 md:mr-0'>Logout</button>
          ) : (
            <NavLink to="/login" className='bg-violet-600 text-white px-4 py-2 rounded-full uppercase font-semibold mr-3 md:mr-0'>Login</NavLink>
          )}
        </div>
        <div className="md:hidden flex mr-2 ">
          <button onClick={toggleNavbar}>{isOpen ? <IoClose size={30} /> : <HiOutlineMenu size={30} />}</button>
        </div>
      </nav>
      {isOpen && (
        <div className="flex flex-col basis-full md:hidden mt-4">
          <NavLinks isOpen={isOpen} />
        </div>
      )}
    </>
  );
}

export default Nav;
