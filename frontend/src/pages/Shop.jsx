import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetFilteredproductsQuery } from "../redux/api/productApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
// import Loader from "../components/Loader";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import ProductCard from "./Product/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { products, checked, radio } = useSelector((state) => state.shop);
  const [priceFilter, setPriceFilter] = useState("");
  const [categoryFilterOpen, setCategoryFilterOpen] = useState(false);
  const [brandFilterOpen, setBrandFilterOpen] = useState(false);
  const [priceFilterOpen, setPriceFilterOpen] = useState(false);
  const categoriesQuery = useFetchCategoriesQuery();
  const filterProductsQuery = useGetFilteredproductsQuery({ checked, radio });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, categoriesQuery.isLoading, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filterProductsQuery.isLoading) {
        const filteredproducts = filterProductsQuery.data.filter((product) => {
          return (
            product?.price.toString().includes(priceFilter) ||
            product?.price === parseInt(priceFilter, 10)
          );
        });
        dispatch(setProducts(filteredproducts));
      }
    }
  }, [
    checked,
    radio,
    filterProductsQuery.isLoading,
    filterProductsQuery.data,
    priceFilter,
    dispatch,
  ]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filterProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    console.log(id);

    const updatedCheck = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    console.log(updatedCheck);
    dispatch(setChecked(updatedCheck));
  };

  const uniqueBrands = Array.from(
    new Set(filterProductsQuery.data?.map((product) => product.brand))
  );

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <>
      <div className="lg:ml-[4rem]">
        <div className="flex-col">
          <div
            className={`
            px-1 pt-4 sm:px-3 mx-1 md:mx-4 mt-3 xl:mb-8 bg-slate-400 dark:bg-slate-950
            rounded-lg xl:w-[80%] xl:justify-self-center`}
          >
            <div className={`${
              categoryFilterOpen || brandFilterOpen ? "h-[32rem]"
              : priceFilterOpen
              ? "h-[8.5rem]"
              : "h-[5.5rem]"
            } flex lg:justify-around translate duration-300 ease-linear`}>
              <section className="w-[33%] max-w-[18rem] pr-1 sm:pr-2">
                <h2
                  className="text-center pt-2 pb-4 mb-2 text-[.95rem] md:text-lg lg:text-xl font-semibold
                border-b-2 border-indigo-600 cursor-pointer"
                  onClick={() => setCategoryFilterOpen(!categoryFilterOpen)}
                >
                  Filter by <br className="md:hidden" /> Categories{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`inline h-5 w-5 ml-1 -mt-0.5 translate duration-300 transform ${
                      categoryFilterOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </h2>
                <div
                  className={`${
                    categoryFilterOpen ? "h-full py-3" : "h-0 py-0"
                  } translate duration-[400ms] 
              ease-linear overflow-hidden`}
                >
                  {categoriesQuery.data?.map((c) => (
                    <div key={c._id} className="mb-2">
                      <div className="flex items-center mr-4 mb-4 md:ml-5">
                        <input
                          type="checkbox"
                          id={`${c._id}`}
                          onChange={(e) => handleCheck(e.target.checked, c._id)}
                          className="w-[1rem] h-[1rem] md:w-[1.2rem] md:h-[1.2rem] 
                        text-indigo-600 bg-gray-100 border-gray-300 rounded
                        focus:outline-none focus:ring-0 focus:ring-offset-0 dark:bg-gray-700
                        dark:border-gray-600 cursor-pointer"
                        />
                        <label
                          htmlFor={`${c._id}`}
                          className="ml-2 text-[.8rem] md:text-[.95rem] lg:text-[1.15rem] 
                        font-medium cursor-pointer text-wrap"
                        >
                          {c.name}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <section className="w-[33%] max-w-[20rem] pr-1 sm:pr-2">
                <h2
                  className="text-center pt-2 pb-4 mb-2 text-[.95rem] md:text-lg lg:text-xl font-semibold
                border-b-2 border-indigo-600 cursor-pointer"
                  onClick={() => setBrandFilterOpen(!brandFilterOpen)}
                >
                  Filter by <br className="md:hidden" /> Brands{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`inline h-5 w-5 ml-1 -mt-0.5 translate duration-300 transform ${
                      brandFilterOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </h2>
                <div
                  className={`${
                    brandFilterOpen ? "h-full py-3" : "h-0 py-0"
                  } translate duration-[400ms] 
              ease-linear overflow-hidden`}
                >
                  {uniqueBrands.map((brand) => (
                    <div
                      key={brand}
                      className="flex items-center mx-2 mb-4 md:ml-5"
                    >
                      <input
                        type="radio"
                        id={brand}
                        name="brand"
                        onChange={() => handleBrandClick(brand)}
                        className="w-[1rem] h-[1rem] md:w-[1.2rem] md:h-[1.2rem] 
                      text-indigo-600 bg-gray-100 border-gray-300
                      focus:outline-none focus:ring-0 focus:ring-offset-0 dark:bg-gray-700
                      dark:border-gray-600 cursor-pointer"
                      />
                      <label
                        htmlFor={brand}
                        className="ml-2 text-[.8rem] md:text-[.95rem] lg:text-[1.15rem] 
                      font-medium cursor-pointer"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </section>
              <section className="w-[33%] max-w-[20rem]">
                <h2
                  className="text-center pt-2 pb-4 mb-2 text-[.95rem] md:text-lg lg:text-xl font-semibold
                border-b-2 border-indigo-600 cursor-pointer"
                  onClick={() => setPriceFilterOpen(!priceFilterOpen)}
                >
                  Filter by <br className="md:hidden" /> Price{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`inline h-5 w-5 ml-1 -mt-0.5 translate duration-300 transform ${
                      priceFilterOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </h2>
                <div
                  className={`${
                    priceFilterOpen ? "h-full py-3" : "h-0 py-0"
                  } translate duration-200 delay-[50ms]
                  ease-linear overflow-hidden text-center`}
                >
                  <input
                    type="text"
                    placeholder="filter price"
                    value={priceFilter}
                    onChange={handlePriceChange}
                    className="w-full max-w-[10rem] px-2 py-1 placeholder-gray-600 lg:px-3 lg:py-2
                  border border-slate-600 rounded bg-slate-200 lg:max-w-[15rem] lg:text-lg
                  focus:outline-none focus:border-2 focus:border-indigo-600 focus:ring-0"
                  />
                </div>
              </section>
            </div>
            <div className="px-5 py-2 flex justify-center">
              <button
                className="w-full max-w-[20rem] bg-indigo-600 text-white font-semibold rounded py-2 mb-2"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>
          <div className="p-3">
            <h2
              className="mb-2 text-[1.5rem] md:mb-6 md:text-[1.7rem] font-medium mt-5 ml-5
            xl:text-center"
            >
              {products.length === 0
                ? "No matching products"
                : `Products (${products.length})`}
            </h2>
            <div className="flex flex-wrap justify-around md:justify-start">
              {products.length > 0 &&
                products.map((p) => (
                  <div key={p._id} className="p-3 md:w-2/4 lg:py-6 xl:w-1/3">
                    <ProductCard product={p} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
