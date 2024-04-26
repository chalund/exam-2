import Travel from "../../assets/travelling.jpg";
import GirlWithMap from "../../assets/girl_with_map.jpg";
import Logo from "../../components/Layout/Logo";

const AboutPage = () => {
  return (
    <div className="mx-auto max-w-screen-md">
      <h1 className="mt-4 text-center text-xl uppercase text-violet-600">
        About
      </h1>
      <div className="sm:p-2">
        <div className="py-4">
          <p className="mb-3">
            Welcome to Holidaze, your ultimate destination for hassle-free
            travel booking and unforgettable experiences!
          </p>
          <p className="mb-3">
            At Holidaze, we believe that every journey should be filled with
            excitement, relaxation, and discovery. That's why we're dedicated to
            providing our customers with the easiest, most enjoyable booking
            experience possible. Whether you're planning a spontaneous getaway
            or a meticulously planned vacation, Holidaze is here to make it
            happen.
          </p>
        </div>

        <div className="flex justify-center">
          <img
            src={Travel}
            alt="Travelling things, passport, sunglasses and camera"
            style={{ width: "100%", height: "300px" }}
            className="md:rounded-lg"
          />
        </div>
        <div className="py-4">
          <div className="mb-3">
            <p className="font-semibold text-violet-600">
              Discover New Destinations
            </p>
            <p>
              With Holidaze, explore a diverse range of destinations, from
              serene beach resorts to picturesque countryside getaways. Our
              carefully curated accommodations ensure you find the perfect spot
              for your next adventure.
            </p>
          </div>
          <div className="mb-3">
            <p className="font-semibold text-violet-600">Seamless Booking</p>
            <p>
              Booking your dream vacation is a breeze with Holidaze. Our
              intuitive platform lets you effortlessly browse, compare, and book
              accommodations in just a few clicks. Say goodbye to complex
              booking processes – at Holidaze, it's smooth sailing all the way.
            </p>
          </div>
          <div className="mb-3">
            <p className="font-semibold text-violet-600">
              Unforgettable Experiences
            </p>
            <p>
              Travel is about creating lasting memories, and at Holidaze, we're
              dedicated to making every moment count. From luxurious amenities
              to personalized recommendations, we ensure every aspect of your
              trip is perfect.
            </p>
          </div>
          <div className="mb-3">
            <p className="font-semibold text-violet-600">
              Your Adventure Awaits
            </p>
            <p>
              Whether you seek a beach escape, city thrill, or cultural
              immersion, Holidaze has it all. Pack your bags, hit the road, and
              let Holidaze be your companion on the journey of a lifetime.
            </p>
          </div>
        </div>

        <div>
          <img
            src={GirlWithMap}
            alt="A girl holding up a map on a bridge"
            style={{ width: "100%", height: "300px" }}
            className="rounded-lg"
          />
        </div>

        <p className="py-4">
          At Holidaze, we're more than just a booking site – we're your trusted
          partner in travel, dedicated to making your vacation dreams a reality.
          Join us and discover a world of endless possibilities. Let's make
          every day a holiday with Holidaze.
        </p>
        <div className="flex justify-center py-4">
          <Logo />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
