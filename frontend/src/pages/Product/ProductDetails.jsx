import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "../../components/HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingReviews }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      <div>
        <Link
          to={"/"}
          className="font-semibold hover:underline hover:text-indigo-600 
          xl:ml-[9rem] 2xl:ml-[12rem]"
        >
          Go Back
        </Link>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div
            className="flex flex-wrap relative items-between 
          mt-[2rem] lg:ml-[9rem] 2xl:ml-[12rem] xl:mr-7"
          >
            <div className="xl:w-5/12 mr-[4rem]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full object-cover max-h-[35rem] sm:w-[20rem] md:w-[25rem]
                lg:w-full"
              />
            </div>
            <HeartIcon product={product} />
            <div className="flex flex-col justify-between">
              <h2 className="text-3xl font-semibold mb-5 w-4/5">
                {product.name}
              </h2>
              <p className="my-4 md:w-[35rem] lg:w-[35rem] h-2/5">
                {product.description}
              </p>
              <p className="text-4xl mb-10 font-bold">
                &#8358; {product.price.toLocaleString()}
              </p>
              <div className="flex items-center justify-between w-[23rem]">
                <div className="one">
                  <div className="flex items-center font-semibold mb-6">
                    <FaStore className="mr-2 text-indigo-600" /> Brand:{" "}
                    {product.brand}
                  </div>
                  <div className="flex items-center font-semibold mb-6">
                    <FaClock className="mr-2 text-indigo-600" /> Added:{" "}
                    {moment(product.createdAt).fromNow()}
                  </div>
                  <div className="flex items-center font-semibold mb-4">
                    <FaStar className="mr-2 text-indigo-600" /> Reviews:{" "}
                    {product.numReviews}
                  </div>
                </div>
                <div className="two">
                  <div className="flex items-center font-semibold mb-6">
                    <FaStar className="mr-2 text-indigo-600" /> Rating:{" "}
                    {product.rating}
                  </div>
                  <div className="flex items-center font-semibold mb-6">
                    <FaShoppingCart className="mr-2 text-indigo-600" />{" "}
                    Quantity: {product.quantity}
                  </div>
                  <div className="flex items-center font-semibold mb-6">
                    <FaBox className="mr-2 text-indigo-600" /> In Stock:{" "}
                    {product.countInStock}
                  </div>
                </div>
              </div>
              <div className="flex justify-between flex-wrap">
                <Ratings
                  value={product.rating}
                  text={`${
                    product.numReviews ? product.numReviews : "No"
                  } review${product.numReviews > 1 ? "s" : ""}`}
                />
                {product.countInStock > 0 && (
                  <div className="">
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 w-6rem rounded-lg bg-transparent mr-[5rem]"
                    >
                      {[...Array(product.countInStock).keys()].map((k) => (
                        <option
                          className="text-black"
                          key={k + 1}
                          value={k + 1}
                        >
                          {k + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="btn-container">
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="bg-indigo-600 text-white font-semibold disabled:bg-gray-400
                  py-2 px-4 rounded-lg mt-[1rem]"
                >
                  Add To Cart
                </button>
              </div>
            </div>
            <div className="mt-[5rem] container flex flex-wrap items-start justify-between xl:ml-[4rem]">
              <ProductTabs
                loadingProductReview={loadingReviews}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
