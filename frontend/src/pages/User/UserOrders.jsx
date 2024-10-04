import { Link } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();  

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : (
        <table className="w-4/5 mx-auto">
          <thead>
            <tr>
              <th className="py-2">Image</th>
              <th className="py-2">ID</th>
              <th className="py-2">Date</th>
              <th className="py-2">Total</th>
              <th className="py-2">Paid</th>
              <th className="py-2">Delivered</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <img
                    src={order.orderItems[0].image}
                    alt={order.user}
                    className="w-[6rem] mb-5"
                  />
                </td>
                <td className="py-2 text-center">{order._id}</td>
                <td className="py-2 text-center">{order.createdAt.substring(0, 10)}</td>
                <td className="py-2 text-center">{Number(order.totalPrice).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}</td>
                <td className="py-2 px-4 text-center">
                  {order.isPaid ? (
                    <p className="text-center font-semibold text-green-400">Completed</p>
                  ) : (
                    <p className="text-center font-semibold text-red-600">Pending</p>
                  )}
                </td>
                <td className="py-2 px-4 text-center">
                  {order.isDelivered ? (
                    <p className="text-center font-semibold text-green-400">Delivered</p>
                  ) : (
                    <p className="text-center font-semibold text-red-600">Pending</p>
                  )}
                </td>
                <td className="py-2 pl-4">
                  <Link to={`/order/${order._id}`} className="bg-indigo-600 text-white">
                  <button className="bg-indigo-600 text-white py-2 px-3 rounded">
                    View Details
                  </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserOrder;
