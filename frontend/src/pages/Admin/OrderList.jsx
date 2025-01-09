import { Link } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";
import { useEffect } from "react";

const OrderList = () => {
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();

  useEffect(() => {
    refetch()
  }, [refetch])

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
          <h1 className="mx-auto md:w-2/3 max-w-[850px] text-2xl font-semibold lg:mt-[6rem] my-12 text-center md:text-left">
            Orders
          </h1>
          <div className="max-w-full overflow-auto px-3 mb-8">
          <table className="mx-auto">
            <thead>
              <tr className="mb-[5rem]">
                <th className="text-left px-3">Items</th>
                <th className="text-left px-3">ID</th>
                <th className="text-left px-3">User</th>
                <th className="px-3">Date</th>
                <th className="pl-1">Total</th>
                <th className="pl-1">Paid</th>
                <th className="pl-1">Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <img
                      src={order.orderItems[0].image}
                      alt={order._id}
                      className="w-[5rem] pt-4 px-3"
                    />
                  </td>
                  <td className="px-3">{order._id}</td>
                  <td className="px-3">{order.user ? order.user.username : "N/A"}</td>
                  <td className="text-center px-3">{order.createdAt.substring(0, 10)}</td>
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
        </div>
      )}
    </>
  );
};

export default OrderList;
