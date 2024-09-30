import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addFavoriteToLocalStorage,
  removeFavoriteFromLocalStorage,
  getFavoritesFromLocalStorage,
} from "../utils/localStorage";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../redux/features/favorites/favoriteSlice";
import { useEffect } from "react";
import { selectFavoriteProducts } from "../redux/features/favorites/favoriteSlice";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavoriteProducts) || [];
  const isFavorite = favorites.some((p) => product._id === p._id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product._id));
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      addFavoriteToLocalStorage(product);
    }
  };

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, [dispatch]);

  return (
    <div
      onClick={toggleFavorite}
      className="absolute top-2 right-5 cursor-pointer"
    >
      {isFavorite ? (
        <FaHeart className="text-indigo-600" />
      ) : (
        <FaRegHeart className="text-indigo-600" />
      )}
    </div>
  );
};

export default HeartIcon;
