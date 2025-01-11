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
    <div className="2xl:max-w-[80%]">
      <div className="px-2 mt-12">
        <Link
          to={"/"}
          className="font-semibold hover:underline hover:text-indigo-600 
          ml-4 md:ml-8 lg:ml-[9rem] 2xl:ml-[12rem] lg:text-xl"
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
            className="flex flex-col lg:flex-row lg:flex-wrap 
            relative items-between justify-start
            mt-[1.5rem] mx-4 md:ml-8 lg:mr-0 lg:ml-[9rem] xl:mr-7 2xl:ml-[12rem]"
          >
            <div className="lg:mr-[3rem] xl:mr-[4rem] sm:w-[20rem] md:w-[25rem] xl:w-[30rem]">
              <img
                src={product.image}
                alt={product.name}
                className="min-w-[100%] object-cover max-h-[30rem]"
              />
            </div>
            <HeartIcon product={product} /> 
            <div className="flex flex-col justify-between md:max-w-[60%] lg:max-w-[30rem]">
              <h2 
              className="text-2xl lg:text-3xl font-semibold 
              my-3 md:mt-5 lg:mt-3 lg:mb-5 lg:w-4/5">
                {product.name}
              </h2>
              <p className="my-4 md:w-[25rem] lg:w-[30rem] h-2/5 text-lg lg:text-xl">
                {product.description}
              </p>
              <p className="text-3xl xl:text-4xl mt-3 mb-10 font-bold">
                &#8358; {product.price.toLocaleString()}
              </p>
              <div 
              className="flex items-center justify-start lg:justify-between 
              lg:w-[27rem]">
                <div className="one mr-8 lg:mr-0">
                  <div className="flex text-sm lg:text-xl items-center font-semibold mb-6">
                    <FaStore className="mr-2 text-indigo-600" /> Brand:{" "}
                    {product.brand}
                  </div>
                  <div className="flex text-sm lg:text-xl items-center font-semibold mb-6">
                    <FaClock className="mr-2 text-indigo-600" /> Added:{" "}
                    {moment(product.createdAt).fromNow()}
                  </div>
                  <div className="flex text-sm lg:text-xl items-center font-semibold mb-4">
                    <FaStar className="mr-2 text-indigo-600" /> Reviews:{" "}
                    {product.numReviews}
                  </div>
                </div>
                <div className="two">
                  <div className="flex text-sm lg:text-xl items-center font-semibold mb-6">
                    <FaStar className="mr-2 text-indigo-600" /> Rating:{" "}
                    {product.rating}
                  </div>
                  <div className="flex text-sm lg:text-xl items-center font-semibold mb-6">
                    <FaShoppingCart className="mr-2 text-indigo-600" />{" "}
                    Quantity: {product.quantity}
                  </div>
                  <div className="flex text-sm lg:text-xl items-center font-semibold mb-6">
                    <FaBox className="mr-2 text-indigo-600" /> In Stock:{" "}
                    {product.countInStock}
                  </div>
                </div>
              </div>
              <div className="flex justify-between flex-wrap my-2 lg:text-xl">
                <Ratings
                  value={product.rating}
                  text={`${
                    product.numReviews ? product.numReviews : "No"
                  } review${product.numReviews > 1 ? "s" : ""}`}
                />
                {product.countInStock > 0 && (
                  <div className="my-2">
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 w-6rem lg:text-lg rounded-lg bg-transparent mr-[5rem]"
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
                  py-2 px-4 rounded-lg mt-[1rem] lg:text-xl"
                >
                  Add To Cart
                </button>
              </div>
            </div>
            <div 
            className="mt-[3rem] md:mt-[5rem] flex items-center md:items-start 
            justify-between xl:ml-[4rem]">
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
    </div>
  );
};

export default ProductDetails;
