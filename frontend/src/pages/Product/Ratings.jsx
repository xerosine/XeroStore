import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value, text, color = "indigo-600" }) => {
  const fullStars = Math.floor(value);
  const halfStars = value - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} className={`text-${color} mr-1`} />
      ))}
      {halfStars === 1 && <FaStarHalfAlt className={`text-${color} mr-1`} />}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index} className={`text-${color} mr-1`} />
      ))}
      <span className={`rating-text ml-[1.5rem]`}>{text && text}</span>
    </div>
  );
};

export default Ratings;
