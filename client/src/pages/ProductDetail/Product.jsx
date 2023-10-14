import React, { useEffect, useState } from "react";
import "./product.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getProductDetailsRoute } from "../../api/api.js";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slices/cart";
import { addToBookmarks } from "../../store/slices/bookmark";
import Navbar from "../../components/Navbar/Navbar";

const Product = () => {
  const [restaurantDetails, setRestaurantDetails] = useState();
  const [category, setCategory] = useState("order online");
  const [searchDiseshQuery, setSearchDiseshQuery] = useState("");
  const [disheshToShow, setDisheshToShow] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  const { name, location } = useParams();

  const restaurantName = name;

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await axios.post(getProductDetailsRoute, {
          restaurantName: restaurantName,
          location: location,
        });

        setRestaurantDetails(response?.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    getProductDetails();
  }, []);

  const handleCategory = (val) => {
    setCategory(val);
  };

  useEffect(() => {
    let timeout = setTimeout(() => {
      let dishesh = restaurantDetails?.dishesh.filter((dish) => {
        return dish.name
          .toLowerCase()
          .includes(searchDiseshQuery.toLowerCase());
      });
      setDisheshToShow([...dishesh]);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchDiseshQuery, restaurantDetails]);

  return (
    restaurantDetails && (
      <div className="product-details-main">
        <Navbar />
        <img src={restaurantDetails.photos[0]} alt="img" />
        <div className="product-details-name-rating">
          <h2>{restaurantDetails.name}</h2>
          <p>{restaurantDetails.rating}</p>
        </div>
        <div className="product-details-cuisines-address">
          <div>
            {restaurantDetails.cuisines.map((cuisine, index) => (
              <p key={index}>{cuisine}, </p>
            ))}
          </div>
          <p>{restaurantDetails.address}</p>
        </div>
        <div className="product-details-category-container">
          <div
            onClick={() => handleCategory("order online")}
            className={
              category == "order online"
                ? "product-details-category product-details-category-add-bg"
                : "product-details-category"
            }
          >
            Order online
          </div>
          <div
            onClick={() => handleCategory("reviews")}
            className={
              category == "reviews"
                ? "product-details-category product-details-category-add-bg"
                : "product-details-category"
            }
          >
            Reviews
          </div>
          <div className="bookmark-btn-container">
            <button
              onClick={() => {
                if (user == null) {
                  alert("Please Sign In");
                  navigate("/signin");
                } else {
                  dispatch(addToBookmarks(restaurantDetails));
                }
              }}
            >
              Bookmark
            </button>
          </div>
          <div className="search-cusines-container">
            <input
              type="text"
              placeholder="search dish"
              onChange={(e) => setSearchDiseshQuery(e.target.value)}
            />
          </div>
        </div>
        <div>
          {category == "order online" ? (
            <div className="dishesh-container">
              {disheshToShow?.map((dish, index) => {
                return (
                  <div key={index} className="dish-container">
                    <img
                      src={dish.image}
                      alt=""
                      className="product-details-menu-img"
                    />
                    <p>{dish.name}</p>
                    <p>{dish.price}</p>
                    <p>{dish.description}</p>
                    <button
                      onClick={() => {
                        if (user == null) {
                          alert("Please Sign In");
                          navigate("/signin");
                        } else {
                          dispatch(addToCart(dish));
                        }
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="reviews-container">
              {restaurantDetails?.reviews.map((review, index) => {
                return (
                  <div key={index}>
                    <h3>{review.name}</h3>
                    <p>{review.rating}</p>
                    <p>{review.description}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Product;
