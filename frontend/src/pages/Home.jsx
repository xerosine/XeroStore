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
          <div className="flex justify-around items-center mb-16 mt-[9rem]">
            <h1 className="mx-[20rem] text-[3rem]">
              Special Products
            </h1>
            <Link
              to={"/shop"}
              className="bg-indigo-600 text-white font-bold rounded-full py-2 px-10 mr-[18rem]"
            >
              Shop
            </Link>
          </div>
          <div>
            <div className="flex justify-center flex-wrap mt-2rem">
              {data.products.map((p) => (
                <div key={p._id} className="">
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
