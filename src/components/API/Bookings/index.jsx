import { apiRequest } from "../ApiRequest";

export const createBooking = async (newData, apiKey) => {
    const endpoint = "/bookings";
    console.log(`Creating booking with data:`, newData);
    console.log(`Using API key: ${apiKey}`);
  
    const response = await apiRequest(endpoint, "POST", newData, apiKey);
    console.log(`Booking created successfully:`, response);
    
    return response;
  };



export const getBookings = async (apiKey) => {
  return apiRequest("/bookings", "GET", null, apiKey);
};