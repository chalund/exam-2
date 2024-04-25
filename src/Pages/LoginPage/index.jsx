import React, { useState } from "react";

import { FaLock } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../../components/Layout/Logo";
import { Login } from "../../components/API";


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleCloseIcon = () => {
    navigate('/');
  }

  const onLoginFormSubmit = async (event) => {
    event.preventDefault();
    console.log('login form submitted');
  
    fetch(Login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
       
      } else {
        throw new Error('Invalid email or password');
      }
    })
    .then(data => {
      navigate('/profile');
      console.log(data); 
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('userEmail', data.data.email);
      localStorage.setItem('username', data.data.name);

    })
    .catch(error => {
      console.error('Error:', error);
      setError('Invalid email or password');
    });
  }




  return (
    <div className="flex min-h-full flex-col px-6 py-12 max-w-sm mx-auto">
      <div className="flex justify-end mb-6">
        <button>
          <IoClose size={30} onClick={handleCloseIcon} />
        </button>
      </div>
      <div className="flex justify-center mb-4">
        <Logo />
      </div>
      <div className='mb-6'>
        <h1 className='font-semibold text-lg py-2'>Sign in or create an account</h1>
        <p>Easily keep track of prices and plan your travels, or switch gears to become a Venue Manager and rent out your spaces hassle-free.</p>
      </div>
      <form onSubmit={onLoginFormSubmit}>
        <div>
          <div>
            <div className="flex items-center text-lg mb-6">
              <MdOutlineEmail className="absolute ml-3" size={24} />
              <input
                name="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="border rounded-xl pl-12 py-2  focus:outline-none w-full" />
            </div>
            <div className="flex items-center text-lg mb-6">
              <FaLock className="absolute ml-3" size={24} />
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
          
                className="border rounded-xl pl-12 py-2  focus:outline-none w-full"
              />
            </div>
          </div>
          <button className="bg-gradient-to-t from-orange-300 to-orange-400 font-medium p-2 mb-2 text-black uppercase w-full rounded-xl">Login</button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <p className="text-sm text-center">Don't have an account yet? <Link to={'/register'} className='underline text-violet-600'>Create an account</Link></p>
      </form>
    </div>
  );
};


export default LoginPage;
