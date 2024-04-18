import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";


const NavLinks = () => {
  return (
  <>
    <NavLink to="/" className="uppercase mb-2 text-xl hover:bg-violet-600 hover:text-white p-2 md:hover:text-violet-600 md:hover:bg-zinc-100 md:hover:font-bold">Home</NavLink>
    <NavLink to="/listings" className="uppercase mb-2 text-xl  hover:bg-violet-600 hover:text-white p-2 md:hover:text-violet-600 md:hover:bg-zinc-100 md:hover:font-bold">Venues</NavLink>
    <NavLink to="/about" className="uppercase text-xl  hover:bg-violet-600 hover:text-white p-2  md:hover:text-violet-600 md:hover:bg-zinc-100 md:hover:font-bold">About</NavLink>
  </>
  )
}

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <nav className="flex justify-end">
        <div className="hidden w-full justify-between md:flex  ">
          <NavLinks />
        </div>
        
        <div className="flex items-center ms-4 space-x-2">
          <NavLink to="/login" className="rounded-full p-1 bg-violet-600 mr-1"><AiOutlineUser size={24} className="text-white"/></NavLink>
          <NavLink to="/login" className="hidden md:inline rounded-full p-1 border border-violet-600"><BiSearch size={30}/></NavLink>
        </div>
        <div className="md:hidden flex ">
          <button onClick={toggleNavbar}>{isOpen ? <IoClose size={30} /> : <HiOutlineMenu size={30} />}</button>
        </div>
      </nav>
      {isOpen && (
        <div className="flex flex-col basis-full mt-3 md:hidden">
          <NavLink to="/login" className="rounded-full p-1 border border-violet-600 mb-2"><BiSearch size={30}/></NavLink>
          <NavLinks />
          
        </div>
      )}
    </>
  
  )
}

export default Nav
