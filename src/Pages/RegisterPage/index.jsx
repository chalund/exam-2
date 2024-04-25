import { FaLock } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import Logo from "../../components/Layout/Logo";
import { useState } from "react";
import { Register } from "../../components/API";



const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Guest');

  const navigate = useNavigate()

  const closeLoginModal = () => {
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if any required fields are empty
    if (!name || !email || !password || !userType) {
      // Alert the user to fill out all fields
      alert('Please fill out all fields');
      return; // Exit the function early
    }
  
    // If all fields are filled out, proceed with registration
    let regobj = {
      name: name,
      email: email,
      password: password,
      userType: userType
    }
    console.log(regobj);
  
    fetch(Register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(regobj)
    }).then(response => {
      console.log('User registered')
      navigate('/login')
    }).catch(error => {
      console.error('Error:', error);       
    });
  }
  

  return (
    <div className="flex min-h-full flex-col px-6 py-12 max-w-sm mx-auto">
      <div className="flex justify-end mb-6">
        <button onClick={closeLoginModal}>
          <IoClose size={30} />
        </button>
      </div>
      <div className="flex justify-center mb-4">
        <Logo/>
      </div>
      <div className='mb-6'>
        <h1 className='font-semibold text-lg py-2'>Create an account</h1>
        <p>Welcome! Please complete your registration to access your account.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <div className="flex items-center text-lg mb-6">
              <AiOutlineUser className="absolute ml-3" size={24} />
                <input type="text"
                value={name}
                onChange={(e) => setName(e.target.value)} 
                id="name" 
                className="border rounded-xl pl-12 py-2  focus:outline-none w-full" 
                placeholder="Name" 
                />
            </div>
            <div className="flex items-center text-lg mb-6">
              <MdOutlineEmail className="absolute ml-3" size={24} />
                <input type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email" 
                className="border rounded-xl pl-12 py-2  focus:outline-none w-full" 
                placeholder="Email address" 
                />
            </div>
            <div className="flex items-center text-lg mb-6">
              <FaLock className="absolute ml-3" size={24} />
                <input type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password" 
                className="border rounded-xl pl-12 py-2  focus:outline-none w-full" 
                placeholder="Password" />
            </div>
            
          <div className="flex gap-4 mb-3">
            <div>
              <input type="radio" 
                id="guestRadio" // Add unique IDs for the radio buttons
                checked={userType === "Guest"}  
                onChange={(e) => setUserType(e.target.value)} 
                name="userType" // Use the same name for both radio buttons in the group
                value="Guest" 
                className="form-radio text-indigo-600"
              />
              <label htmlFor="guestRadio"> Guest</label> {/* Associate label with input using htmlFor */}
            </div>
            <div>
              <input type="radio" 
                id="venueManagerRadio" // Add unique IDs for the radio buttons
                checked={userType === "Venue Manager"}
                onChange={(e) => setUserType(e.target.value)}
                name="userType" // Use the same name for both radio buttons in the group
                value="Venue Manager" 
              />
              <label htmlFor="venueManagerRadio"> Venue Manager </label> {/* Associate label with input using htmlFor */}
            </div>
          </div>


          </div>
          <button type="submit" className="bg-gradient-to-t from-orange-300 to-orange-400 font-medium p-2 mb-2 text-black uppercase w-full rounded-xl">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage;
