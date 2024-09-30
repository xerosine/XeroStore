import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addToFavorites: (state, action) => {
      //add product to favorites if not already in favorites
      if (state.every((product) => product._id !== action.payload._id)) {
        state.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      //remove product from favorites
      return state.filter((product) => product._id !== action.payload);
    },
    setFavorites: (state, action) => {
      //Set the favorites from localStorage
      return action.payload;
    },
  },
});

export const { addToFavorites, removeFromFavorites, setFavorites } =
  favoriteSlice.actions;
export const selectFavoriteProducts = (state) => state.favorites;
export default favoriteSlice.reducer;
