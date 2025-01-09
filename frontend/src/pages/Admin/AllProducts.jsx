import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";
import { useEffect } from "react";

const AllProducts = () => {
  const { data: products, isLoading, isError, refetch } = useAllProductsQuery();

  useEffect(() => {
    refetch();
  }, [refetch, products]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="mx-auto px-2  md:px-4 lg:pl-[7rem] xl:pl-[9rem] xl:pr-0 2xl:max-w-[85%]">
      <AdminMenu />
      <div className="flex flex-col">
        <div className="md:p-3">
          <div className="ml-2 text-2xl text-center font-bold h-12 my-10">
            All Products ({products.length})
          </div>

          <div
            className="flex flex-row flex-wrap justify-around
          items-start"
          >
            {products.map((product) => (
              <div
                key={product._id}
                className="block mb-10 overflow-hidden lg:mr-7 w-[45%] sm:w-[18rem] md:w-[21rem]"
              >
                <div className="flex flex-col w-full mx-auto">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover max-h-[20rem] md:min-h-[14rem]"
                  />
                  <div className="px-1 sm:px-3 py-2 flex flex-col justify-around">
                    <h5 className="text-[1.3rem] md:text-[1.5rem] 2xl:text-xl font-semibold mb-1">
                      {product?.name}
                    </h5>
                    <div className="flex justify-between">
                      <p
                        className="text-gray-500 w-2/4 md:w-3/5 dark:text-gray-400 text-[.85rem] 
                        md:text-[1.2rem] mb-2"
                      >
                        {moment(product?.createdAt).format("MMMM Do, YYYY")}
                      </p>
                      <p className="w-2/4 md:w-2/5 text-sm md:text-xl ml-2 md:ml-4">
                        &#8358; {product?.price}
                      </p>
                    </div>
                    <p
                      className="text-gray-700 dark:text-gray-300 md:w-[17rem] 
                      sm:w-[13rem] text-[.98rem] md:text-[1.3rem] mb-4"
                    >
                      {product?.description.substring(0, 160) +
                        (product.description.length > 160 ? "..." : "")}
                    </p>
                    <div className="flex justify-between">
                      <Link
                        to={`/admin/product/update/${product._id}`}
                        className="inline-flex items-center py-3 px-2 text-sm md:text-xl font-medium 
                        text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
                      >
                        Update Product
                        <svg
                          className="w-3.5 h-3.5 ml-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
