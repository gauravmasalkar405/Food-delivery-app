import React from "react";
import { useSelector } from "react-redux";
import Card from "../../components/Card/Card";

const Bookmark = () => {
  const bookmarkRestaurants = useSelector(
    (state) => state.bookmark.bookmarkItems
  );

  return (
    <div>
      {bookmarkRestaurants &&
        bookmarkRestaurants.map((restau, index) => {
          return <Card restaurant={restau} key={index} />;
        })}
    </div>
  );
};

export default Bookmark;
