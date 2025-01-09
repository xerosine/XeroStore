import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/userApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesQuery,
  useGetTotalSalesByDateQuery,
} from "../../redux/api/orderApiSlice";
import { useState, useEffect } from "react";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading: loadingSales } = useGetTotalSalesQuery();
  const { data: users, isLoading: loadingUsers } = useGetUsersQuery();
  const { data: orders, isLoading: loadingOrders } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: false,
      },
      colors: ["#4f46e5"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#334155",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales.$numberDecimal,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },
        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <>
      <section className="md:ml-0 lg:ml-[3rem] xl:ml-[5rem]">
        <div className="w-full pt-5 flex justify-around md:justify-evenly flex-wrap">
          <div 
          className="rounded p-3 pt-2 bg-slate-400 dark:bg-slate-800 
          w-[13.5rem] md:w-[12rem] xl:w-[15rem] mt-5 relative group">
            <div
              className="bg-indigo-600 absolute top-0 left-0 w-[2px] h-0 rounded-lg
              transition-[height] duration-300 ease-linear group-hover:h-full"
            ></div>
            <p 
            className="my-2 mx-auto px-3 lg:px-4 py-2 font-semibold text-xl lg:text-2xl 
            border-l-2 border-indigo-600">
              Sales
            </p>
            <div className="font-bold ml-1.5 text-lg xl:text-2xl">
              &#8358;{" "}
              {loadingSales ? (
                <Loader />
              ) : (
                Number(sales?.totalSales).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              )}
            </div>
          </div>
          <div 
          className="rounded p-3 pt-2 bg-slate-400 dark:bg-slate-800 
          w-[13.5rem] md:w-[12rem] xl:w-[15rem] mt-5 relative group">
            <div
              className="bg-indigo-600 absolute top-0 left-0 w-[2px] h-0 rounded-lg
              transition-[height] duration-300 ease-linear group-hover:h-full"
            ></div>
            <p 
            className="my-2 mx-auto px-3 lg:px-4 py-2 font-semibold text-xl lg:text-2xl 
            border-l-2 border-indigo-600">
              Users
            </p>
            <div className="font-bold ml-1.5 text-lg xl:text-2xl">
              {loadingUsers ? <Loader /> : users.length}
            </div>
          </div>
          <div 
          className="rounded p-3 pt-2 bg-slate-400 dark:bg-slate-800 
          w-[13.5rem] md:w-[12rem] xl:w-[15rem] mt-5 relative group">
            <div
              className="bg-indigo-600 absolute top-0 left-0 w-[2px] h-0 rounded-lg
              transition-[height] duration-300 ease-linear group-hover:h-full"
            ></div>
            <p 
            className="my-2 mx-auto px-3 lg:px-4 py-2 font-semibold text-xl lg:text-2xl 
            border-l-2 border-indigo-600">
              Orders
            </p>
            <div className="font-bold ml-1.5 text-lg xl:text-2xl">
              {loadingOrders ? <Loader /> : orders.totalOrders}
            </div>
          </div>
        </div>

        <div className="mt-[4rem]">
          <div className="mx-auto w-[95%] sm:w-[80%] max-w-[850px]">
          <Chart
            options={state.options}
            series={state.series}
            type="line"
            width="95%"
          />
          </div>
        </div>

        <div className="mt-[4rem]">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
