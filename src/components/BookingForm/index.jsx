import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = ({ price }) => {
  // State variables to manage form inputs and total price
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [guests, setGuests] = useState(2);
  const [total, setTotal] = useState(0);

  const calculateDays = () => {
    const start = startDate.getTime();
    const end = endDate.getTime();
    const dayDifference = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // Calculate day difference
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Number of Guests:", guests);
    console.log("Day Difference:", dayDifference);
    return dayDifference;
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const days = calculateDays();
    const pricePerDay = price || 1; // Set default price per day to 1 if no price is provided or if price is falsy
    const totalPrice = pricePerDay * days; // Calculate total price based on price per day
  
    // If days is 0, set total price to price per day
    setTotal(days === 0 ? pricePerDay : totalPrice);
  };
  

  return (
    <div className="m-5">
      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="mb-3">
            <p>Select check-in</p>
            <div className="flex items-center gap-2 rounded-xl border py-1 pl-3">
              <DatePicker
                showIcon
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>
          <div className="mb-3">
            <p>Select check-out</p>
            <div className=" flex items-center gap-2 rounded-xl border py-1 pl-3">
              <DatePicker
                showIcon
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
          </div>
        </div>
        <div className="relative">
  <input
    type="number"
    placeholder="Guests"
    value={guests}
    onChange={(e) => setGuests(e.target.value)}
    min={1}
    className="h-10 w-full rounded-xl border  pl-6 pr-4 focus:outline-none"
  />
  <span className="absolute inset-y-0 left-10 flex items-center pr-2 text-gray-500">Guest(s)</span>
</div>
        <div className="mt-4 flex justify-center">
          <button
            type="submit"
            className="mb-5  w-full rounded-full bg-gradient-to-t from-violet-500 to-violet-700 text-white px-8 py-2 font-semibold uppercase hover:from-orange-400 hover:to-orange-500 hover:text-white"
          >
            Book now
          </button>
        </div>
      </form>
      <div className="mr-3 flex justify-between border-b pb-2">
      <p>${price} per day x {calculateDays() ? `${calculateDays()} days` : '1 day'}</p>


        <p>${total}</p>
      </div>
      <div className="mr-3 mt-4 flex justify-between font-bold">
        <p>Total</p>
        <p>${total}</p>
      </div>
    </div>
  );
};

export default BookingForm;
