import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems, itemsPrice } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="container flex justify-around items-start flex wrap mx-auto mt-8">
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty.{" "}
            <Link to={"/shop"} className="text-indigo-600">
              Go to shop
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-[80%] max-w-[60rem]">
              <h1 className="text-2xl font-semibold mb-[2.5rem]">
                Shopping Cart
              </h1>
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center mb-[1rem] pb-2"
                >
                  <div className="w-[5rem] h-[5rem]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 ml-4">
                    <Link
                      to={`/product/${item._id}`}
                      className="text-indigo-600 text-lg font-semibold"
                    >
                      {item.name}
                    </Link>
                    <div className="mt-2">{item.brand}</div>
                    <div className="mt-2 font-bold">
                      &#8358; {item.price.toLocaleString("en-US")}
                    </div>
                  </div>
                  <div className="w-24">
                    <select
                      className="w-full px-2 border rounded bg-transparent"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((k) => (
                        <option
                          key={k + 1}
                          value={k + 1}
                          className="text-black"
                        >
                          {k + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <button className="text-red-500 mr-[5rem]">
                      <FaTrash
                        className="ml-[1rem] mt-[.5rem]"
                        onClick={() => removeFromCartHandler(item._id)}
                      />
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-8 w-40rem">
                <div className="p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">
                    Items (
                    {Number(cartItems.reduce((acc, item) => acc + item.qty, 0))}
                    )
                  </h2>
                  <div className="text-2xl font-bold">
                    &#8358;{" "}
                    {Number(itemsPrice).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <button
                    className="bg-indigo-600 text-white my-6 py-2 px-4 rounded text-lg
                    w-fit font-semibold"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
