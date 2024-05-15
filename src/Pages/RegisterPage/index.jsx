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
  const [userType, setUserType] = useState("Guest");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State variable for the specific error message
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const closeLoginModal = () => {
    navigate("/");
  };

  const handleClearName = () => {
    setName("");
  };
  const handleClearEmail = () => {
    setEmail("");
  };
  const handleClearPassword = () => {
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    validateName();
    validateEmail();
    validatePassword();

    // Check if any errors
    if (nameError || emailError || passwordError) {
      return;
    }

    // If no errors, proceed with registration
    let regobj = {
      name: name,
      email: email,
      password: password,
      userType: userType,
    };

    fetch(Register, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(regobj),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Registration failed");
        }
        console.log("User registered");
        // navigate("/login");
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Check if the error is due to a profile already existing
        {
          // Set email error message to indicate email is taken
          setEmailError(
            "This email is already in use. Please use a different one.",
          );
        }
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
    <div className="mx-auto flex min-h-full max-w-sm flex-col px-6 py-12">
      <div className="mb-6 flex justify-end">
        <button onClick={closeLoginModal}>
          <IoClose size={30} />
        </button>
      </div>
      <div className="mb-4 flex justify-center">
        <Logo />
      </div>
      <div className="mb-6">
        <h1 className="py-2 text-lg font-semibold">Create an account</h1>
        <p>
          Welcome! Please complete your registration to access your account.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <div className="relative mb-5 flex flex-col text-lg">
              <AiOutlineUser className="absolute ml-4 mt-2" size={24} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={validateName}
                id="name"
                className={`w-full rounded-xl border py-2  pl-12 focus:outline-none ${
                  nameError && "border-red-700"
                }`}
                placeholder="Name"
              />
              <IoClose
                size={30}
                onClick={handleClearName}
                className="absolute right-3 top-2  cursor-pointer text-gray-800"
              />
              {nameError && <p className="mt-1 text-red-700">{nameError}</p>}
            </div>

            <div className=" relative mb-5 flex flex-col text-lg">
              <MdOutlineEmail className="absolute ml-4 mt-3" size={24} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
                id="email"
                className={`w-full rounded-xl border py-2  pl-12 focus:outline-none ${
                  emailError && "border-red-700"
                }`}
                placeholder="Email address"
              />
              <IoClose
                size={30}
                onClick={handleClearEmail}
                className="absolute right-3 top-2  cursor-pointer text-gray-800"
              />
              {emailError && <p className="mt-1  text-red-700">{emailError}</p>}
            </div>

            <div className="relative mb-5 flex flex-col text-lg">
              <FaLock className="absolute ml-4 mt-3" size={24} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
                id="password"
                className={`w-full rounded-xl border py-2  pl-12 focus:outline-none ${
                  passwordError && "border-red-700"
                }`}
                placeholder="Password"
              />
              <IoClose
                size={30}
                onClick={handleClearPassword}
                className="absolute right-3 top-2  cursor-pointer text-gray-800"
              />
              {passwordError && (
                <p className="mt-1 text-red-700">{passwordError}</p>
              )}
            </div>

            <div className="mb-3 flex gap-4">
              <div>
                <input
                  type="radio"
                  id="guestRadio"
                  checked={userType === "Guest"}
                  onChange={(e) => setUserType(e.target.value)}
                  name="userType"
                  value="Guest"
                  className="form-radio text-indigo-600"
                />
                <label htmlFor="guestRadio"> Guest</label>{" "}
              </div>
              <div>
                <input
                  type="radio"
                  id="venueManagerRadio"
                  checked={userType === "Venue Manager"}
                  onChange={(e) => setUserType(e.target.value)}
                  name="userType"
                  value="Venue Manager"
                />
                <label htmlFor="venueManagerRadio"> Venue Manager </label>{" "}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mb-2 w-full rounded-xl bg-gradient-to-t from-orange-300 to-orange-400 p-2 font-medium uppercase text-black"
          >
            Submit
          </button>
          {loggedIn && (
            <div className="mt-3">
              <p>Registration was successful!! Please login:</p>
              <button className="mt-2 w-full rounded-xl bg-gradient-to-t from-violet-400 to-violet-700 p-2 font-medium uppercase text-black">
                <Link to="/login">Login</Link>
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
