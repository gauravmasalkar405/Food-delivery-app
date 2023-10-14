import React, { useEffect, useState } from "react";
import "./home.scss";
import zomatoBrandName from "../../assets/zomato-name.avif";
import { Link } from "react-router-dom";
import axios from "axios";
import { getLocation } from "../../api/api.js";
import { IoIosArrowForward } from "react-icons/io";

const Home = () => {
  const [locations, setLocations] = useState();

  // getting location from database
  useEffect(() => {
    const getLocations = async () => {
      try {
        const response = await axios.get(getLocation);

        setLocations([...response?.data]);
      } catch (error) {
        console.log(error);
      }
    };

    getLocations();
  }, []);

  return (
    <div className="home-main-container">
      <div className="home-bg-and-brand">
        <div className="home-main-bg"></div>
        <div className="home-brand-headline">
          <img src={zomatoBrandName} className="brand-img" />
          <div>
            <p className="home-brand-tagline">
              Find the best restaurants, cafés and bars in India
            </p>
          </div>
        </div>
      </div>

      <div className="home-body">
        <p className="home-body-headline">Popular locations in India</p>

        <div>
          <p className="home-body-desc">
            From swanky upscale restaurants to the cosiest hidden gems serving
            the most incredible food, Zomato covers it all. Explore menus, and
            millions of restaurant photos and reviews from users just like you,
            to find your next great meal.
          </p>
        </div>
      </div>
      <div className="home-body-locaions">
        {locations &&
          locations.map((location, index) => {
            return (
              <Link to={`list/${location}`} key={index}>
                <div className="location-box">
                  <p>{location}</p>
                  <IoIosArrowForward />
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Home; // Exporting the Home component
