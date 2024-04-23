import { FaLock } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from 'react-router-dom';
import Logo from "../../components/Layout/Logo";

const RegisterPage = () => {
  return (
    <div className="flex min-h-full flex-col px-10 py-12 sm:border ">
    <div className="flex justify-end mb-6">
      <IoClose size={30} />
    </div>
    <div className="flex justify-center mb-4">
      <Logo/>
    </div>
    <div className='mb-6'>
      <h1 className='font-semibold text-lg py-2'>Create an account</h1>
      <p>Easily keep track of prices and plan your travels, or switch gears to become a Venue Manager and rent out your spaces hassle-free.</p>
    </div>
    <form action="#">
      <div>
        <div>
        <div className="flex items-center text-lg mb-6">
            <AiOutlineUser className="absolute ml-3" size={24} />
            <input type="text" id="username" className="border rounded-xl pl-12 py-2  focus:outline-none w-full" placeholder="Username" />
          </div>
          <div className="flex items-center text-lg mb-6">
            <MdOutlineEmail className="absolute ml-3" size={24} />
            <input type="email" id="email" className="border rounded-xl pl-12 py-2  focus:outline-none w-full" placeholder="Email address" />
          </div>
          <div className="flex items-center text-lg mb-6">
            <FaLock className="absolute ml-3" size={24} />
            <input type="password" id="password" className="border rounded-xl pl-12 py-2  focus:outline-none w-full" placeholder="Password" />
          </div>
          <div>
            
          </div>
        </div>
        <button className="bg-gradient-to-t from-orange-300 to-orange-400 font-medium p-2 mb-2 text-black uppercase w-full rounded-xl">Submit</button>
      </div>
    </form>
  </div>
  )
}

export default RegisterPage