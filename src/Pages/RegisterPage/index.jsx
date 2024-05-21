import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/Layout/Logo";
import { Register } from "../../components/API";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [venueManager, setVenueManager] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const closeLoginModal = () => {
    navigate("/");
  };

  const handleClearField = (setter) => {
    setter("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateName();
    validateEmail();
    validatePassword();

    if (nameError || emailError || passwordError) {
      return;
    }

    let registrationData = {
      name: name,
      email: email,
      password: password,
      venueManager: venueManager,
    };

    fetch(Register, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Registration failed");
        }
        console.log("User registered");
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        setEmailError("This email is already in use. Please use a different one.");
      });
  };

  const validateName = () => {
    if (!name.trim()) {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError("Email must be a @stud.noroff.no address");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email address");
    } else if (!email.endsWith("@stud.noroff.no")) {
      setEmailError("Email must be a @stud.noroff.no address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (!password.trim()) {
      setPasswordError("Password must be at least 8 characters");
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="mx-auto mb-16 mt-8 flex max-w-sm flex-col px-6">
      <div className="mb-2 flex justify-end">
        <button onClick={closeLoginModal}>
          <IoClose size={30} />
        </button>
      </div>
      <div className="mb-4 flex justify-center">
        <Logo />
      </div>
      <div className="mb-6">
        <h1 className="py-2 text-lg font-semibold">Create a new account</h1>
        <p>Welcome! Please complete your registration to access your account.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <div className={`relative flex flex-col ${nameError ? "mb-2" : "mb-5"}`}>
              <AiOutlineUser className="absolute ml-4 mt-2" size={24} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={validateName}
                id="name"
                className={`w-full rounded-xl border py-2 pl-12 focus:border-violet-700 focus:bg-white focus:outline-none ${
                  nameError ? "border-red-700" : ""
                }`}
                placeholder="Name"
              />
              <IoClose
                size={30}
                onClick={() => handleClearField(setName)}
                className="absolute right-3 top-2 cursor-pointer text-gray-800"
              />
              {nameError && <p className="mt-1 text-red-700">{nameError}</p>}
            </div>

            <div className={`relative flex flex-col ${emailError ? "mb-2" : "mb-5"}`}>
              <MdOutlineEmail className="absolute ml-4 mt-2" size={24} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
                id="email"
                className={`w-full rounded-xl border py-2 pl-12 focus:border-violet-700 focus:bg-white focus:outline-none ${
                  emailError ? "border-red-700" : ""
                }`}
                placeholder="Email address"
              />
              <IoClose
                size={30}
                onClick={() => handleClearField(setEmail)}
                className="absolute right-3 top-2 cursor-pointer text-gray-800"
              />
              {emailError && <p className="mt-1 text-red-700">{emailError}</p>}
            </div>

            <div className={`relative flex flex-col ${passwordError ? "mb-2" : "mb-5"}`}>
              <FaLock className="absolute ml-4 mt-2" size={24} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
                id="password"
                className={`w-full rounded-xl border py-2 pl-12 focus:border-violet-700 focus:bg-white focus:outline-none ${
                  passwordError ? "border-red-700" : ""
                }`}
                placeholder="Password"
              />
              <IoClose
                size={30}
                onClick={() => handleClearField(setPassword)}
                className="absolute right-3 top-2 cursor-pointer text-gray-800"
              />
              {passwordError && <p className="mt-1 text-red-700">{passwordError}</p>}
            </div>

            <div className="mb-3 flex gap-4">
              <div>
                <input
                  type="radio"
                  id="guestRadio"
                  checked={!venueManager}
                  onChange={() => setVenueManager(false)}
                  name="userType"
                  value="Guest"
                  className="text-violet-700 checked:bg-violet-700 focus:ring-violet-700"
                />
                <label htmlFor="guestRadio"> Guest</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="venueManagerRadio"
                  checked={venueManager}
                  onChange={() => setVenueManager(true)}
                  name="userType"
                  value="Venue Manager"
                  className="text-violet-700 checked:bg-violet-700 focus:ring-violet-700"
                />
                <label htmlFor="venueManagerRadio"> Venue Manager </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mb-2 w-full rounded-xl bg-gradient-to-t from-orange-300 to-orange-400 p-2 font-medium uppercase text-black hover:to-orange-500"
          >
            Submit
          </button>
          {loggedIn && (
            <div className="mt-3">
              <p className="text-xl text-center mb-2">Registration was successful!!</p>
              <button className="mt-2 w-full rounded-xl bg-gradient-to-t from-violet-400 to-violet-700 p-2 font-medium uppercase text-white hover:to-violet-900">
                <Link to="/login">Login</Link>
              </button>
            </div>
          )}
        </div>
        {!loggedIn && (
          <p className="text-md mt-2">
            Have an account?{" "}
            <Link to={"/login"} className="text-violet-700 underline">
              Login Here
            </Link>
          </p>
        )}
      </form>
    </div>
  );
};

export default RegisterPage;
