import React, { useState } from "react";

import { FaLock } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import Logo from "../../components/Layout/Logo";
import { Login } from "../../components/API";


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);


  const onFormSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Call the login function with the profile object
      const profile = { email, password };
      await Login(profile);
  
      // If login is successful, you can redirect the user to another page here
      // Example:
      // history.push("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const closeLoginModal = () => {
    window.location.href = '/';
  };
  

  return (
    <div className="flex min-h-full flex-col px-10 py-12 sm:border ">
      <div className="flex justify-end mb-6">
        <button onClick={closeLoginModal}>
          <IoClose size={30} />
        </button>
      </div>
      <div className="flex justify-center mb-4">
        <Logo />
      </div>
      <div className='mb-6'>
        <h1 className='font-semibold text-lg py-2'>Sign in or create an account</h1>
        <p>Easily keep track of prices and plan your travels, or switch gears to become a Venue Manager and rent out your spaces hassle-free.</p>
      </div>
      <form onSubmit={onFormSubmit}>
        <div>
          <div>
            <div className="flex items-center text-lg mb-6">
              <MdOutlineEmail className="absolute ml-3" size={24} />
              <input
                name="email"
                type="text"
                value={email}
                placeholder="Email"
                onChange={onEmailChange}
                className="border rounded-xl pl-12 py-2  focus:outline-none w-full" />
            </div>
            <div className="flex items-center text-lg mb-6">
              <FaLock className="absolute ml-3" size={24} />
              <input
                name="password"
                type="password"
                value={password}
                placeholder="Password"
                onChange={onPasswordChange}
                className="border rounded-xl pl-12 py-2  focus:outline-none w-full"
              />
            </div>
          </div>
          <button className="bg-gradient-to-t from-orange-300 to-orange-400 font-medium p-2 mb-2 text-black uppercase w-full rounded-xl">Login</button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <p>Don't have an account yet? <Link to={'/register'} className='ms-1 underline text-violet-600'>Create an account</Link></p>
      </form>
    </div>
  );
};

export default LoginPage;
