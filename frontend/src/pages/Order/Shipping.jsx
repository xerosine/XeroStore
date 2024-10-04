import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  savePaymentMethod,
  saveShippingAddress,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "./ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress.address]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <>
      <ProgressSteps step1 step2 />
      <div className="container mx-auto mt-10">
        <div className="mt-[10rem] flex justify-around items-center flex-wrap">
          <form onSubmit={submitHandler} className="w-[40rem]">
            <h1 className="text-2xl font-semibold mb-7">Shipping</h1>
            <div className="mb-6">
              <label htmlFor="address" className="block mb-2">
                Address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                placeholder="Enter Address"
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border rounded bg-transparent"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="city" className="block mb-2">
                City
              </label>
              <input
                type="text"
                id="city"
                value={city}
                placeholder="Enter City"
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2 border rounded bg-transparent"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="postalCode" className="block mb-2">
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                value={postalCode}
                placeholder="Enter Postal Code"
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full p-2 border rounded bg-transparent"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="country" className="block mb-2">
                Country
              </label>
              <input
                type="text"
                id="country"
                value={country}
                placeholder="Enter Country"
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-2 border rounded bg-transparent"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="paymentMethod" className="block">
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod"
                  value="PayPal"
                  className="form-radio text-indigo-500"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-2">PayPal or Credit Card</span>
              </label>
            </div>
            <button
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg text-lg w-1/4
            hover:bg-indigo-500"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
