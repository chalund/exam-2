// import { Register } from "../..";
// import { navigate } from "react-router-dom"; // Import the navigate function from react-router-dom

// export const registerUser = async (regobj) => {
//   try {
//     const response = await fetch(Register, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(regobj),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to register user");
//     }

//     console.log("User registered");
//     navigate("/login"); // Redirect to the login page after successful registration
//   } catch (error) {
//     console.error("Error:", error);
//     // Handle error as needed
//   }
// };
