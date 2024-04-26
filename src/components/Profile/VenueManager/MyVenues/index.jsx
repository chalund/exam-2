import React from "react";
import CreateNewVenueButton from "../CreateNewVenue";

const MyVenues = () => {
  const handleCreateNewVenueForm = () => {
    console.log("Create new venue form");
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="ms-6 text-xl md:text-2xl font-semibold uppercase text-orange-600 items-center">
          My venues
        </h1>
        <div className="mr-3 flex">
          <CreateNewVenueButton onClick={handleCreateNewVenueForm} />
        </div>
      </div>
    </div>
  );
};

export default MyVenues;
