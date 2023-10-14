import React from "react";
import "./card.scss";
import { useNavigate } from "react-router-dom";

const Card = ({ restaurant }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${restaurant?.name}`);
  };

  return (
    <div className="card-main-container" onClick={handleClick}>
      <img src={restaurant.photos[0]} alt="" className="card-image" />
      <div className="name-rating-container">
        <p className="name">{restaurant.name}</p>
        <p className="rating">{restaurant.rating}</p>
      </div>
      <div className="cuisines-and-price-container">
        <div>
          {restaurant?.cuisines?.map(
            (ele, index) => index < 2 && <span key={index}>{ele + ", "}</span>
          )}
        </div>
        <p>Rs. {restaurant.priceForOne} for one</p>
      </div>
      <p className="time">{restaurant?.deliveryTime} min</p>
    </div>
  );
};

export default Card;
