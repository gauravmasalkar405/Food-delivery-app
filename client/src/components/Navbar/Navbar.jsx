import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./navbar.scss";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const user = useSelector((state) => state.user.user);

  const { location } = useParams();

  return (
    <div className="navbar-main">
      <div className="navbar-logo-container">
        <img
          src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png"
          tabindex="0"
        />
      </div>
      <div className="navbar-search-bar">
        <input type="text" placeholder="Search for restaurants" />
        <BsSearch />
      </div>
      <div
        onClick={() => setShowLinks(!showLinks)}
        className="nav-links-show-hide"
      >
        {showLinks ? <RxCross2 /> : <FaBars />}
      </div>
      <div className={showLinks ? "nav-links show" : "nav-links hide"}>
        <Link to="/signin">Sign In</Link>
        <Link to={user == null ? "/signin" : "/cart"}>Cart</Link>
        <Link to={user == null ? "/signin" : `/bookmark/${location}`}>
          Bookmarks
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
