import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { BASE_URL } from "../../../components/API";
import { useFetch } from "../../../components/Hooks/useFetch";
import { useState } from "react";
import Spinner from "../../../components/Spinner/Loader";

const VenueImages = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`${BASE_URL}/venues/${id}`);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  if (loading) {
    return (
      <div className="text-center text-2xl">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || !data.data) {
    return <div>No data available</div>;
  }

  const { media } = data.data;

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div className="mx-auto mt-4 max-w-screen-md">
      <div className="flex items-center gap-2">
        <FaArrowLeft />
        <Link to={`/venue/${id}`} className="underline">
          Back to Venue
        </Link>
      </div>

      <div className="mb-10 mt-4 grid grid-cols-1  gap-4 md:grid-cols-2 lg:grid-cols-2">
        {media.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Image ${index}`}
            className="h-72 w-full md:block md:max-h-72 md:cursor-pointer lg:block cursor-pointer"
            onClick={() => openModal(image.url)}
          />
        ))}
      </div>

      {isModalOpen && (
        <div
          className="modal"
          style={{
            position: "fixed",
            top: -60,
            left: 0,
            width: "100%",
            height: "110vh",
            zIndex: 999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Apply background color only when modal is open
          }}
        >
          <div
            className="modal-content hidden md:block lg:block"
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "80%",
              maxWidth: "800px",
            }}
          >
            <span
              className="close flex cursor-pointer justify-end text-2xl"
              onClick={closeModal}
            >
              &times;
            </span>

            <img
              src={selectedImage}
              alt="Selected"
              className="mt-4 h-auto w-full rounded-xl"
              style={{ maxHeight: "calc(100vh - 200px)" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VenueImages;
