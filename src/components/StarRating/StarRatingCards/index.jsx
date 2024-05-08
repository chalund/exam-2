import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";

const StarRatingCard = ({ rating, size }) => {
  const [ratingValue, setRatingValue] = useState(null);

  useEffect(() => {
    setRatingValue(rating);
  }, [rating]);

  return (
    <div className="flex w-14 items-center justify-center rounded-full bg-violet-700  text-white">
      {ratingValue !== null && ratingValue !== 0 ? (
        <>
          <label>
            <FaStar size={16} color={"orange"} />
          </label>
          <span className="ml-1 font-semibold">{ratingValue}</span>
        </>
      ) : null}
    </div>
  );
};

export default StarRatingCard;
