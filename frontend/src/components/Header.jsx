import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Product/SmallProduct";
import ProductCarousel from "../pages/Product/ProductCarousel";
import { useEffect } from "react";

const Header = () => {
  const {
    data: topProductsData,
    isLoading,
    isError,
    refetch,
  } = useGetTopProductsQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <div className="mt-6 md:mt-4 lg:pl-[2rem]">
        <h1 className="text-center text-[1.8rem] md:text-[2.7rem] mb-5 xl:mb-10">Top Products</h1>
        <div className="flex justify-around xl:justify-evenly">
          <div className="hidden xl:block w-6/12 max-w-[39rem]">
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
      </div>
    </>
  );
};

export default Header;
