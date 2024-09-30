import { Link } from "react-router-dom"
import HeartIcon from "../../components/HeartIcon"

const Product = ({product}) => {
  return (
    <div className="w-[25rem] ml-[2rem] p-3 relative">
        <div className="relative">
            <img src={product.image} alt={product.name} className="w-[25rem] rounded" />
            <HeartIcon product={product}/>
        </div>
        <div className="p-4">
            <Link to={`/product/${product._id}`}>
                <h2 className="flex justify-between items-start">
                    <div className="text-lg w-3/5">
                        {product.name}
                    </div>
                    <span className="bg-indigo-100 text-indigo-800 text-sm font-medium mx-1
                    px-2.5 py-1 rounded-full dark:bg-indigo-700 dark:text-indigo-100">
                        &#8358; {product.price.toLocaleString()}
                    </span>
                </h2>
            </Link>
        </div>
    </div>
  )
}

export default Product