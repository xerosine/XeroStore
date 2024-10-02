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
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );
  const [priceFilter, setPriceFilter] = useState("");
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
            console.log(product.price);
            
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
      <div className="ml-[9rem]">
        <div className="flex md:flex-row">
          <div className="p-3 my-2 bg-slate-950 rounded-lg h-fit">
            <section>
              <h2
                className="text-center pt-2 pb-4 mb-2 text-lg font-semibold
                border-b-2 border-indigo-600"
              >
                Filter by Categories
              </h2>
              <div className="p-5 w-[15rem]">
                {categoriesQuery.data?.map((c) => (
                  <div key={c._id} className="mb-2">
                    <div className="flex items-center mr-4 mb-4">
                      <input
                        type="checkbox"
                        id={`${c._id}`}
                        onChange={(e) => handleCheck(e.target.checked, c._id)}
                        className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded
                        focus:outline-none focus:ring-0 focus:ring-offset-0 dark:bg-gray-700
                        dark:border-gray-600 cursor-pointer"
                      />
                      <label
                        htmlFor={`${c._id}`}
                        className="ml-2 text-sm font-medium cursor-pointer"
                      >
                        {c.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2
                className="text-center pt-2 pb-4 mb-2 text-lg font-semibold
                border-b-2 border-indigo-600"
              >
                Filter by Brands
              </h2>
              <div className="p-5">
                {uniqueBrands.map((brand) => (
                  <div key={brand} className="flex items-center mr-4 mb-4">
                    <input
                      type="radio"
                      id={brand}
                      name="brand"
                      onChange={() => handleBrandClick(brand)}
                      className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300
                        focus:outline-none focus:ring-0 focus:ring-offset-0 dark:bg-gray-700
                        dark:border-gray-600 cursor-pointer"
                    />
                    <label
                      htmlFor={brand}
                      className="ml-2 text-sm font-medium cursor-pointer"
                    >
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2
                className="text-center pt-2 pb-4 mb-2 text-lg font-semibold
                border-b-2 border-indigo-600"
              >
                Filter by Price
              </h2>
              <div className="p-5 w-[15rem]">
                <input
                  type="text"
                  placeholder="Enter Price"
                  value={priceFilter}
                  onChange={handlePriceChange}
                  className="w-full px-3 py-2 placeholder-gray-500 border rounded bg-transparent
                  focus:outline-none focus:border-2 focus:border-indigo-600 focus:ring-0"
                />
              </div>
            </section>
            <div className="p-5 pb-2 flex justify-center">
              <button
                className="w-full bg-indigo-600 text-white font-semibold rounded py-2 my-4"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>
          <div className="p-3">
            <h2 className="mb-2 text-lg font-medium mt-5 ml-5">
              {products.length === 0
                ? "No matching products"
                : `Products (${products.length})`}
            </h2>
            <div className="flex flex-wrap">
              {products.length > 0 &&
                products.map((p) => (
                  <div key={p._id} className="p-3">
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
