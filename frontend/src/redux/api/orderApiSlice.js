import { apiSlice } from "./apiSlice";
import { ORDER_URL, PAYPAL_URL } from "../constants";

const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createOrder: builder.mutation({
            query: order => ({
                url: ORDER_URL,
                method: 'POST',
                body: order
            })
        }),
        getOrders: builder.query({
            query: () => ORDER_URL
        }),
        getOrderDetails: builder.query({
            query: id => ({
                url: `${ORDER_URL}/${id}`
            })
        }),
        payOrder: builder.mutation({
            query: ({orderId, details}) => ({
                url: `${ORDER_URL}/${orderId}/pay`,
                method: 'PUT',
                body: details
            })
        }),
        getPaypalClientId: builder.query({
            query: () => PAYPAL_URL
        }),
        getMyOrders: builder.query({
            query: () => `${ORDER_URL}/mine`,
            keepUnusedDataFor: 5
        }),
        deliverOrder: builder.mutation({
            query: (orderId) => ({
                url: `${ORDER_URL}/${orderId}/deliver`,
                method: 'PUT'
            })
        }),
        getTotalOrders: builder.query({
            query: () => `${ORDER_URL}/total-orders`
        }),
        getTotalSales: builder.query({
            query: () => `${ORDER_URL}/total-sales`
        }),
        getTotalSalesByDate: builder.query({
            query: () => `${ORDER_URL}/total-sales-by-date`
        }),
    })
})

export const {
    useGetTotalOrdersQuery,
    useGetTotalSalesQuery,
    useGetTotalSalesByDateQuery,
    // above for admin dashboard
    useCreateOrderMutation,
    useDeliverOrderMutation,
    useGetMyOrdersQuery,
    useGetOrderDetailsQuery,
    useGetOrdersQuery,
    usePayOrderMutation,
    useGetPaypalClientIdQuery
} = orderApiSlice