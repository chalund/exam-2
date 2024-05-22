import { BASE_URL } from "..";

export const apiRequest = async (
  endpoint,
  method = "GET",
  data = null,
  apiKey = null,
) => {
  const accessToken = localStorage.getItem("accessToken");
  const url = `${BASE_URL}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...(apiKey && { "X-Noroff-API-Key": apiKey }),
  };

  const options = {
    method,
    headers,
    ...(data && { body: JSON.stringify(data) }),
  };

  try {
    console.log(`Making ${method} request to ${url} with options:`, options);
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const responseData = await response.json();
    console.log(`Response from ${url}:`, responseData);
    return responseData;
  } catch (error) {
    console.error(`Error in ${method} request to ${endpoint}:`, error);
    throw error;
  }
};
