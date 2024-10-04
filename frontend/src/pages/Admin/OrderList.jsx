import { Link } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.error || error.message}
        </Message>
      ) : (
        <div>
          <AdminMenu />
          <table className="container mx-auto">
            <thead>
              <tr className="mb-[5rem]">
                <th className="text-left pl-1">Items</th>
                <th className="text-left pl-1">ID</th>
                <th className="text-left pl-1">User</th>
                <th className="pl-1">Date</th>
                <th className="pl-1">Total</th>
                <th className="pl-1">Paid</th>
                <th className="pl-1">Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <img
                      src={order.orderItems[0].image}
                      alt={order._id}
                      className="w-[5rem] pt-4"
                    />
                  </td>
                  <td>{order._id}</td>
                  <td>{order.user ? order.user.username : "N/A"}</td>
                  <td className="text-center">{order.createdAt.substring(0, 10)}</td>
                  <td className="text-center">
                    {Number(order.totalPrice).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {order.isPaid ? (
                      <p className="text-center font-semibold text-green-400">
                        Completed
                      </p>
                    ) : (
                      <p className="text-center font-semibold text-red-600">
                        Pending
                      </p>
                    )}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {order.isDelivered ? (
                      <p className="text-center font-semibold text-green-400">
                        Delivered
                      </p>
                    ) : (
                      <p className="text-center font-semibold text-red-600">
                        Pending
                      </p>
                    )}
                  </td>
                  <td className="py-2 pl-4">
                    <Link
                      to={`/order/${order._id}`}
                      className="bg-indigo-600 text-white"
                    >
                      <button className="bg-indigo-600 text-white py-2 px-3 rounded">
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default OrderList;
