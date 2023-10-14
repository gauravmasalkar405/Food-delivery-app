import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import { makeServer } from "../mirage/config.js";
import { Provider } from "react-redux";
import store from "./store/store.js";
import List from "./pages/List/List.jsx";
import ProductDetails from "./pages/ProductDetail/Product.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import Bookmark from "./pages/Bookmark/Bookmark.jsx";

makeServer();

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="list/:location" element={<List />} />
          <Route path="list/:location/:name" element={<ProductDetails />} />
          <Route
            path="/bookmark/:location/:name"
            element={<ProductDetails />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/bookmark/:location" element={<Bookmark />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
