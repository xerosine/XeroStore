import { Link } from "react-router-dom";
import HeartIcon from "../../components/HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-full p-3 relative">
      <div className="relative">
        <img src={product.image} alt={product.name} className="rounded" />
        <HeartIcon product={product} />
      </div>
      <div className="p-2 md:py-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex flex-wrap justify-between items-start">
            <div className="w-full md:text-xl md:w-2/4 xl:w-7/12 mb-3 md:mb-0 xl:mt-1">
              {product.name}
            </div>
            <span
              className="bg-indigo-200 text-indigo-900 text-sm md:text-lg font-medium -ml-1 md:mx-1
              px-2.5 py-1 rounded-full dark:bg-indigo-700 dark:text-indigo-100"
            >
              &#8358; {product.price.toLocaleString()}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
