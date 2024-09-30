import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Product/SmallProduct";
import ProductCarousel from "../pages/Product/ProductCarousel";

const Header = () => {
  const { data: topProductsData, isLoading, isError } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <div className="flex justify-around">
        <div className="hidden xl:block">
            <div className="grid grid-cols-2">
                {topProductsData.map((product) => (
                    <div key={product._id}>
                        <SmallProduct product={product}></SmallProduct>
                    </div>
                ))}
            </div>
        </div>
        <ProductCarousel />
      </div>
    </>
  );
};

export default Header;
