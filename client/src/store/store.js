import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart.js";
import bookmarkReducer from "./slices/bookmark.js";
import userReducer from "./slices/user.js";

export default configureStore({
  reducer: {
    cart: cartReducer,
    bookmark: bookmarkReducer,
    user: userReducer,
  },
});
