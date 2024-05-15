import { Login } from "../../index.jsx";

export const loginUser = async (email, password) => {
  const response = await fetch(Login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid email or password");
  }

  return response.json();
};
