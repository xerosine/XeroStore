import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";

const ProductTabs = ({
  loadingReviews,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();

  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (num) => setActiveTab(num);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col md:flex-row">
      <section className="mr-[5rem] pr-7 border-r-2 border-indigo-600 w-[15rem]">
        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 1 ? "font-bold text-indigo-500" : ""
          }`}
          onClick={() => {
            handleTabClick(1);
          }}
        >
          Write your review
        </div>
        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 2 ? "font-bold text-indigo-500" : ""
          }`}
          onClick={() => {
            handleTabClick(2);
          }}
        >
          All reviews
        </div>
        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 3 ? "font-bold text-indigo-500" : ""
          }`}
          onClick={() => {
            handleTabClick(3);
          }}
        >
          Related products
        </div>
      </section>
      <section>
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <div className="my-2">
                  <label htmlFor="rating" className="block text-xl mb-4">
                    Rate this product
                  </label>
                  <select
                    value={rating}
                    id="rating"
                    onChange={(e) => setRating(e.target.value)}
                    className="py-2 px-3 rounded-lg border md:w-[15rem] bg-transparent"
                    required
                  >
                    <option className="text-black" value="">
                      Select rating
                    </option>
                    <option className="text-black" value="1">
                      Horrible
                    </option>
                    <option className="text-black" value="2">
                      Inferior
                    </option>
                    <option className="text-black" value="3">
                      Decent
                    </option>
                    <option className="text-black" value="4">
                      Excellent
                    </option>
                    <option className="text-black" value="5">
                      Exceptional
                    </option>
                  </select>
                </div>
                <div className="my-6">
                  <label htmlFor="comment" className="block text-xl mb-2">
                    {" "}
                    Leave a comment
                  </label>
                  <textarea
                    value={comment}
                    id="comment"
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border rounded-lg md:w-[25rem] bg-transparent"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingReviews}
                  className="bg-indigo-600 text-white py-2 px-4 rounded-lg 
                  disabled:bg-gray-400 mb-6 font-semibold"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p>
                Please{" "}
                <Link to="/login" className="text-indigo-500">
                  sign in
                </Link>{" "}
                to write a review
              </p>
            )}
          </div>
        )}
      </section>
      <section>
        {activeTab === 2 && (
          <>
            <div className="mt-4 text-lg font-semibold">
              {product.reviews.length === 0 && <p>No Reviews</p>}
            </div>
            <div>
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="p-4 rounded-lg sm:ml-0 lg:ml-[2rem] sm:w-[24rem] lg:w-[30rem] 
                  mb-5 bg-slate-100 dark:bg-slate-800"
                >
                    <div className="flex justify-between">
                        <strong>{review.name}</strong>
                        <p>{review.createdAt.substring(0, 10)}</p>
                    </div>
                    <p className="my-4">{review.comment}</p>
                    <Ratings value={review.rating}/>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
      <section>
        {activeTab === 3 && (
            <div className="ml-[4rem] flex flex-wrap">
                {!data ? (<Loader />) : (
                    data.map(product => (
                        <div key={product._id}>
                            <SmallProduct product={product} />
                        </div>
                    ))
                )}
            </div>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;
