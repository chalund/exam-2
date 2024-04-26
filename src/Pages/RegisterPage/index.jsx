import { FaLock } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Layout/Logo";
import { useState } from "react";
import { Register } from "../../components/API";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Guest");

  const navigate = useNavigate();

  const closeLoginModal = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any required fields are empty
    if (!name || !email || !password || !userType) {
      // Alert the user to fill out all fields
      alert("Please fill out all fields");
      return; // Exit the function early
    }

    // If all fields are filled out, proceed with registration
    let regobj = {
      name: name,
      email: email,
      password: password,
      userType: userType,
    };
    console.log(regobj);

    fetch(Register, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(regobj),
    })
      .then((response) => {
        console.log("User registered");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
            <div className="mb-6 flex items-center text-lg">
              <AiOutlineUser className="absolute ml-3" size={24} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                className="w-full rounded-xl border py-2  pl-12 focus:outline-none"
                placeholder="Name"
              />
            </div>
            <div className="mb-6 flex items-center text-lg">
              <MdOutlineEmail className="absolute ml-3" size={24} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="w-full rounded-xl border py-2  pl-12 focus:outline-none"
                placeholder="Email address"
              />
            </div>
            <div className="mb-6 flex items-center text-lg">
              <FaLock className="absolute ml-3" size={24} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                className="w-full rounded-xl border py-2  pl-12 focus:outline-none"
                placeholder="Password"
              />
            </div>

            <div className="mb-3 flex gap-4">
              <div>
                <input
                  type="radio"
                  id="guestRadio" // Add unique IDs for the radio buttons
                  checked={userType === "Guest"}
                  onChange={(e) => setUserType(e.target.value)}
                  name="userType" // Use the same name for both radio buttons in the group
                  value="Guest"
                  className="form-radio text-indigo-600"
                />
                <label htmlFor="guestRadio"> Guest</label>{" "}
                {/* Associate label with input using htmlFor */}
              </div>
              <div>
                <input
                  type="radio"
                  id="venueManagerRadio" // Add unique IDs for the radio buttons
                  checked={userType === "Venue Manager"}
                  onChange={(e) => setUserType(e.target.value)}
                  name="userType" // Use the same name for both radio buttons in the group
                  value="Venue Manager"
                />
                <label htmlFor="venueManagerRadio"> Venue Manager </label>{" "}
                {/* Associate label with input using htmlFor */}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mb-2 w-full rounded-xl bg-gradient-to-t from-orange-300 to-orange-400 p-2 font-medium uppercase text-black"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
