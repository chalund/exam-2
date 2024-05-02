import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { BASE_URL } from "../../../components/API";
import { useFetch } from "../../../components/Hooks/useFetch";
import { useState } from "react";

const VenueImages = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`${BASE_URL}/venues/${id}`);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  if (loading) {
    return <div>Loading...</div>;
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
    <div className="mx-auto max-w-screen-md mt-4">
      <div className="flex items-center gap-2">
        <FaArrowLeft />
        <Link to={`/venue/${id}`} className="underline">
          Back to Venue
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 md: lg:grid-cols-2  gap-4 mt-4 mb-4">
        {media.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Image ${index}`}
            className="w-full h-72 md:max-h-72 cursor-pointer"
            onClick={() => openModal(image.url)}
          />
        ))}
      </div>

      {isModalOpen && (
        <div
          className="modal "
          style={{
            position: "fixed",
            top: -60,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="modal-content"
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
              className="w-full h-auto mt-4 rounded-xl"
              style={{ maxHeight: "calc(100vh - 200px)" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VenueImages;
