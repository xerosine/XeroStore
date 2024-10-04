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
      className="max-w-sm bg-[1A1A1A] relative rounded-lg shadow 
        dark:bg-gray-800 dark:border-gray-700"
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
            className="cursor-pointer w-full object-cover"
          />
        </Link>
        <HeartIcon product={product} />
      </section>
      <div className="p-5">
        <div className="flex justify-between">
          <h5 className="mb-2 text-xl w-3/5">{product.name}</h5>
          <p className="font-semibold text-indigo-500">
            &#8358;{" "}
            {product.price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <p className="mb-3">
          {product?.description.substring(0, 160) +
            (product.description.length > 160 ? "..." : "")}
        </p>
        <section className="flex justify-between items-center">
          <Link
            to={`/product/${product._id}`}
            className="inline-flex items-center p-1 text-md font-medium text-center
            text-gray-500 rounded-lg hover:text-gray-400"
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
