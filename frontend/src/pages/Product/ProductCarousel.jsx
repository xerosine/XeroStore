import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 mt-2 w-[70%] lg:w-3/4 xl:w-5/12 xl:max-w-[32rem]">
      {isLoading ? null : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Slider
          {...settings}
        >
          {products.map((p) => (
            <div key={p._id}>
              <div className="lg:flex xl:block lg:flex-row lg:justify-between">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-[35vh] rounded-lg object-cover max-h-[35rem] md:h-[27rem]
                lg:w-2/4 xl:w-full"
              />
              <Link
                to={`/product/${p._id}`}
                className="flex flex-wrap justify-between w-full lg:w-2/4 xl:w-full
                mt-3 px-2 lg:pl-[2rem] xl:pl-4"
              >
                <div className="w-full">
                  <h2 className="font-semibold mb-2 md:text-xl">{p.name}</h2>
                  <p
                    className="bg-indigo-200 text-indigo-900 font-medium w-fit text-sm md:text-lg
                    px-2.5 py-1 rounded-full dark:bg-indigo-700 dark:text-indigo-100 md:my-4"
                  >
                    &#8358;{" "}
                    {p.price.toLocaleString(
                      ("en-US",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    )}
                  </p>
                  <p className="w-25rem mt-3 text-sm md:text-lg md:mb-4 xl:mr-5">
                    {p?.description.substring(0, 170) +
                      (p.description.length > 170 ? "..." : "")}
                  </p>
                </div>
                <div className="hidden md:flex justify-between">
                  <div className="mr-10">
                    <div className="flex items-center mb-6 w-8rem">
                      <FaStore className="mr-2 text-indigo-700" /> Brand:{" "}
                      {p.brand}
                    </div>
                    <div className="flex items-center mb-6 w-8rem">
                      <FaClock className="mr-2 text-indigo-700" /> Added:{" "}
                      {moment(p.createdAt).fromNow()}
                    </div>
                    <div className="flex items-center mb-6 w-8rem">
                      <FaStar className="mr-2 text-indigo-700" /> Reviews:{" "}
                      {p.numReviews}
                    </div>
                  </div>
                  <div className="mr-3">
                    <div className="flex items-center mb-6 w-8rem">
                      <FaStar className="mr-2 text-indigo-700" /> Ratings:{" "}
                      {Math.round(p.rating)}
                    </div>
                    <div className="flex items-center mb-6 w-8rem">
                      <FaShoppingCart className="mr-2 text-indigo-700" />{" "}
                      Quantity: {p.quantity}
                    </div>
                    <div className="flex items-center mb-6 w-8rem">
                      <FaBox className="mr-2 text-indigo-700" /> In Stock:{" "}
                      {p.countInStock}
                    </div>
                  </div>
                </div>
              </Link>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
