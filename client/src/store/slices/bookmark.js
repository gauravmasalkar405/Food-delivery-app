import { createSlice } from "@reduxjs/toolkit";

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: {
    bookmarkItems: [],
  },
  reducers: {
    addToBookmarks: (state, action) => {
      state.bookmarkItems.push(action.payload);
    },
    removeFromBookmarks: (state, action) => {},
  },
});

export const { addToBookmarks, removeFromBookmarks } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
