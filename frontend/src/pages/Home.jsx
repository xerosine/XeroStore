import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Product/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword && <Header />}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant={"danger"}>
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div
            className="flex flex-col md:flex-row justify-center items-center 
            mb-6 md:mb-16 mt-10 md:mt-14 lg:mt-20"
          >
            <h1 className="mb-5 md:mb-0 md:mr-[7rem] lg:mr-[10rem] xl:mr-[15rem]
            text-[2rem] md:text-[3rem]">
              Special Products
            </h1>
            <Link
              to={"/shop"}
              className="bg-indigo-600 text-white font-bold rounded-full py-2 px-10 
              md:mt-2.5"
            >
              Shop
            </Link>
          </div>
          <div>
            <div className="flex justify-center md:justify-evenly flex-wrap mt-2 lg:pl-[4rem]
            xl:w-[85%] xl:mx-auto xl:max-w-[1400px]">
              {data.products.map((p) => (
                <div key={p._id} className="w-2/4 md:w-2/5 xl:w-1/3 max-w-[350px]">
                  <Product product={p}></Product>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
