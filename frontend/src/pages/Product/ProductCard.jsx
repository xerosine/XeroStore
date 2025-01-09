import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "../../components/HeartIcon";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully!");
  };

  return (
    <div
      className="w-[15rem] md:w-[20rem] lg:w-[25rem] xl:w-[80%] max-w-[400px] bg-slate-300 relative 
      rounded-lg shadow-sm shadow-indigo-400 dark:bg-gray-800 dark:border-gray-700 md:mx-auto"
    >
      <section className="relative">
        <Link to={`/product/${product._id}`}>
          <span
            className="absolute bottom-3 right-3 bg-indigo-100 text-indigo-800 text-sm font-medium
          mr-2 px-2.5 py-1 rounded-full dark:bg-indigo-800 dark:text-indigo-200"
          >
            {product.brand}
          </span>
          <img
            src={product.image}
            alt={product.name}
            className="cursor-pointer w-full object-cover 
            max-h-[320px] lg:max-h-[400px] xl:max-h-[336px]"
          />
        </Link>
        <HeartIcon product={product} />
      </section>
      <div className="py-5 px-3">
        <div className="flex justify-between">
          <h5 className="mb-2 text-[1rem] md:text-[1.23rem] w-2/4 font-medium">{product.name}</h5>
          <p className="text-[.95rem] md:text-[1.1rem] font-semibold text-indigo-600">
            &#8358;{" "}
            {product.price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <p className="mb-3 text-[.93rem] md:text-[1.1rem]">
          {product?.description.substring(0, 160) +
            (product.description.length > 160 ? "..." : "")}
        </p>
        <section className="flex justify-between items-center">
          <Link
            to={`/product/${product._id}`}
            className="inline-flex items-center p-1 text-[.93rem] md:text-[1.1rem] 
            font-medium text-center text-gray-500 rounded-lg hover:text-gray-400"
          >
            Read More...
          </Link>
          <button
            className="p-2 rounded-full text-indigo-600 disabled:text-gray-400"
            disabled={product.countInStock === 0}
            onClick={() => addToCartHandler(product, 1)}
          >
            <AiOutlineShoppingCart size={25} className="" />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
