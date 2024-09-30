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
    <div className="container px-4 lg:pl-[8rem] xl:pl-[10rem] xl:pr-0 2xl:max-w-full 2xl:w-3/4">
      <AdminMenu />
      <div className="flex flex-col md:flex-row">
        <div className="p-3">
          <div className="ml-2 text-2xl font-bold h-12 my-10">
            All Products ({products.length})
          </div>

          <div className="flex flex-wrap justify-between items-center">
            {products.map((product) => (
              <div
                key={product._id}
                className="block mb-10 overflow-hidden mr-7"
              >
                <div className="flex">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[10rem] h-[10rem] object-cover"
                  />
                  <div className="px-4 py-1 flex flex-col justify-around">
                    <h5 className="text-lg 2xl:text-xl font-semibold mb-1">
                      {product?.name}
                    </h5>
                    <div className="flex justify-between">
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                        {moment(product?.createdAt).format("MMMM Do, YYYY")}
                      </p>
                      <p className="mr-7">&#8358; {product?.price}</p>
                    </div>
                    <p
                      className="text-gray-600 dark:text-gray-300 xl:w-[20rem] md:w-[17rem] 
                      sm:w-[13rem] text-sm mb-4"
                    >
                      {product?.description.substring(0, 160) +
                        (product.description.length > 160 ? "..." : "")}
                    </p>
                    <div className="flex justify-between">
                      <Link
                        to={`/admin/product/update/${product._id}`}
                        className="inline-flex items-center py-3 px-2 text-sm font-medium text-center
                        text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
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
