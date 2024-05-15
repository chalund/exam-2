import { BASE_URL, Venues } from "../../components/API";
import { useFetch } from "../../components/Hooks/useFetch";
import Nyksund from "../../assets/nyksund.jpg";
import Lofoten from "../../assets/lofoten.jpg";
import GirlSun from "../../assets/girlInSun.jpg";
import Travel from "../../assets/travel.jpg";
import { BiSearch } from "react-icons/bi";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { BsCurrencyDollar } from "react-icons/bs";
import Spinner from "../../components/Spinner/Loader";

import { Link } from "react-router-dom";
import LastTreeCards from "../../components/lastTreeCards";

const HomePage = () => {
  const { data, loading, error } = useFetch(BASE_URL + Venues);

  if (loading) {
    return (
      <div className="text-center text-2xl">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-lg">
      <div className="relative">
        <img
          src={Nyksund}
          alt="Nyksund, a small fisher village at the sea"
          style={{
            width: "100%",
            height: "300px",
            filter: "brightness(60%)",
          }}
          className="md:mt-6 md:rounded-xl"
        />

        <div className="absolute  bottom-0 left-10 top-2 flex  w-44 flex-col items-center justify-center uppercase">
          <h2 className="text-2xl font-bold text-white">
            Discover new amazing places to visit
          </h2>

          <button className="mt-8 rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-8 py-2 font-semibold uppercase hover:from-orange-400 hover:to-orange-500 hover:text-white">
            <Link to="/listings">Discover</Link>
          </button>
        </div>
      </div>

      <div className="mx-auto ms-5 overflow-x-auto md:ms-0 md:items-center ">
        <LastTreeCards />
      </div>

      <div className="my-12 ml-5 flex overflow-auto md:ml-0 lg:ml-0">
        <div className="flex justify-evenly rounded-lg bg-violet-700 p-5 text-white">
          <p className="m-2 mt-5 w-72 p-1 text-xl font-semibold md:w-1/4">
            Find and book your perfect stay
          </p>
          <div className="m-3 mx-6 flex w-1/3 flex-col items-center rounded-3xl border p-2 px-4 md:w-1/4">
            <p>Search for new exiting places</p>
            <BiSearch size={36} className="mt-2" />
          </div>
          <div className="m-3 mx-6 flex  w-1/3 flex-col items-center rounded-3xl border p-2 px-4 md:w-1/4">
            <p>Sign up and save money</p>
            <BsCurrencyDollar size={36} className="mt-2" />
          </div>
          <div className="m-3 mx-6 flex w-1/3 flex-col items-center rounded-3xl border p-2 px-4 md:w-1/4">
            <p>Explore available dates on venues</p>
            <IoCalendarNumberOutline size={36} className="mt-2" />
          </div>
        </div>
      </div>

      <div className="m-6 grid grid-cols-1 gap-4  md:grid-cols-4 lg:m-0">
        <div className="col-span-1 row-span-1 rounded-xl md:col-span-3 md:row-span-2">
          <div className="card rounded-xl border">
            <img
              src={Lofoten}
              alt="image from Reine in Lofoten"
              className="card-img-top h-56 w-full rounded-xl object-cover md:h-96"
            />
            <div className="card-body p-2">
              <h5 className="card-title font-semibold">
                Explore Exciting New Destinations
              </h5>
              <h6 className="card-subtitle text-muted mb-2">
                Check out our latest places
              </h6>
            </div>
          </div>
        </div>
        <div className="col-span-1 rounded-xl md:col-span-1">
          <div className="card rounded-xl border bg-white">
            <img
              src={Travel}
              alt="Travelling things, passport, sunglasses and camera"
              className="card-img-top h-56 w-full rounded-xl object-cover md:h-32"
            />
            <div className="card-body p-2">
              <h5 className="card-title font-semibold">
                Book your next vacay now
              </h5>
              <h6 className="card-subtitle text-muted mb-2">
                Find your holiday
              </h6>
            </div>
          </div>
        </div>
        <div className="col-span-1 rounded-xl md:col-span-1">
          <div className="card rounded-xl border md:mt-2 lg:mt-7">
            <img
              src={GirlSun}
              alt="girl standing in front of a sunset"
              className="card-img-top h-56 w-full rounded-xl object-cover md:h-40"
            />
            <div className="card-body p-2">
              <h5 className="card-title mb-2 font-semibold">Travel Tips</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-violet-700 py-8 md:my-12 md:rounded-xl">
        <p className="text-center text-lg font-semibold  uppercase text-white md:text-xl">
          Subscribe our newsletter
        </p>
        <form action="">
          <div className="md:text-md mt-3 justify-center text-center text-sm ">
            <input
              type="email"
              placeholder="yourmail@example.com"
              className="font-sm md:font-md rounded-full border p-4 py-2 md:mt-4 md:px-14 md:pl-6 "
            />
            <button className=" md:text-md rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-4 py-2 text-sm font-semibold uppercase hover:from-orange-400 hover:to-orange-500 hover:text-white md:mb-5 md:ms-4">
              subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
