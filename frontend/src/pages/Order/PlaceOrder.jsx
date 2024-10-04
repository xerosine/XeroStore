import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import ProgressSteps from "./ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    for (const value of Object.values(cart.shippingAddress)) {
      if (!value) {
        navigate("shipping");
      }
    }
  }, [cart.shippingAddress, navigate]);

  return (
    <>
      <ProgressSteps step1 step2 step3 />
      <div className="container mx-auto mt-8">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty.</Message>
        ) : (
          <div className="overflow-x-auto mt-[4rem]">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-1 px-2 text-left align-top">Image</th>
                  <th className="px-1 px-2 text-left">Name</th>
                  <th className="px-1 px-2 text-left">Quantity</th>
                  <th className="px-1 px-2 text-left">Price</th>
                  <th className="px-1 px-2 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 object-cover"
                      />
                    </td>
                    <td className="p-2">
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </td>
                    <td className="p-2">{item.qty}</td>
                    <td className="p-2">
                      &#8358;{" "}
                      {Number(item.price).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="p-2">
                      &#8358;{" "}
                      {(item.price * item.qty).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-[5rem]">
          <h2 className="text-2xl font-semibold mb-10">Order Summary</h2>
          <div className="flex justify-around flex-wrap py-4 px-2 bg-slate-800">
            <ul className="text-lg">
              <li className="my-2">
                <span className="font-semibold mb-2 inline-block w-[5rem]">
                  Items:{" "}
                </span>
                <span className="text-right inline-block w-[8rem]">
                  &#8358;{" "}
                  {Number(cart.itemsPrice).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </li>
              <li className="my-2">
                <span className="font-semibold mb-2 inline-block w-[5rem]">
                  Shipping:{" "}
                </span>
                <span className="text-right inline-block w-[8rem]">
                  &#8358;{" "}
                  {Number(cart.shippingPrice).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </li>
              <li className="my-2">
                <span className="font-semibold mb-2 inline-block w-[5rem]">
                  Tax:{" "}
                </span>
                <span className="text-right inline-block w-[8rem]">
                  &#8358;{" "}
                  {Number(cart.taxPrice).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </li>
              <li className="my-2">
                <span className="font-semibold mb-2 inline-block w-[5rem]">
                  Total:{" "}
                </span>
                <span className="text-right inline-block w-[8rem]">
                  &#8358;{" "}
                  {Number(cart.totalPrice).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </li>
            </ul>

            {error && <Message variant="danger">{error.data.message}</Message>}

            <div>
              <h2 className="text-xl font-semibold mb-4">Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <strong>Method: </strong> {cart.paymentMethod}
            </div>
          </div>

          <button
            type="button"
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg text-lg 
            text-center w-[10rem] mt-4 disabled:bg-indigo-400"
            disabled={cart.cartItems.length === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>

          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
