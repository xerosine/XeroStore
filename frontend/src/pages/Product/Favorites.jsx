import { useSelector } from "react-redux";
import { selectFavoriteProducts } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProducts);

  return (
    <div className="mx-[1.5rem] md:ml-[2.5rem] lg:ml-[3rem]">
      {favorites == 0 ? (
        <h1 className="text-2xl font-semibold ml-[2.3rem] lg:ml-[3rem] xl:ml-[5rem] mt-[3rem]">
          No Favorite Products Selected
        </h1>
      ) : (
        <>
          <h1 className="text-[1.8rem] font-semibold ml-[2.3rem] lg:ml-[3rem] xl:ml-[9rem] mt-[3rem] mb-7">
            Favorite Products
          </h1>
          <div className="mx-auto">
          <div className="flex justify-start flex-wrap mt-2
            xl:w-[85%] xl:mx-auto xl:max-w-[1400px] mx-auto">
            {favorites.map((product) => (
              <div key={product._id} className="w-2/4 xl:w-1/3 max-w-[350px]">
                <div className="mx-auto w-[90%]">
              <Product product={product} />
              </div>
              </div>
            ))}
          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;
