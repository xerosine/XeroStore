import { useSelector } from "react-redux";
import { selectFavoriteProducts } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProducts);

  return (
    <div className="ml-[10rem]">
      {favorites == 0 ? (
        <h1 className="text-2xl font-semibold ml-[3rem] mt-[3rem]">
          No Favorite Products Selected
        </h1>
      ) : (
        <>
          <h1 className="text-2xl font-bold ml-[3rem] my-[3rem]">
            Favorite Products
          </h1>
          <div className="flex flex-wrap">
            {favorites.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;
