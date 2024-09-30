import { Link } from "react-router-dom";
import HeartIcon from "../../components/HeartIcon"

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[17rem] ml-[2rem] p-3">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-auto rounded"
        />
        <HeartIcon product={product}></HeartIcon>
        <div className="px-1 py-4">
          <Link to={`/product/${product._id}`}>
            <h2 className="flex justify-between">
              <div className="w-2/4">{product.name}</div>
              <div>
                <span
                  className="bg-indigo-100 text-indigo-800 text-sm font-medium mx-1 
                  px-2.5 py-1 rounded-full dark:bg-indigo-700 dark:text-indigo-100"
                >
                  &#8358; {product.price.toLocaleString()}
                </span>
              </div>
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;
