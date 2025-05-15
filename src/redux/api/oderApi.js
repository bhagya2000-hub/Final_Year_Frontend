import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  tagTypes:["Order","AdminOrders"],
  baseQuery: fetchBaseQuery({ 
  
    baseUrl: "http://localhost:4000/api/v1",
    credentials: "include" 
  }),
  endpoints: (builder) => ({
    createNewOrder: builder.mutation({
      query(body) {
        return {
          url: "/order/new",
          method: "POST",
          body,
        }
      }
    }),
    myOrders: builder.query({
      query:()=>`/me/orders`
    }),
    oderDetails: builder.query({
      query:(id)=>`/orders/${id}`,
      providesTags:["Order"]
    }),
    stripeCheckoutSession: builder.mutation({
      query(body) {
        return {
          url: "/payment/checkout_session",
          method: "POST",
          body,
        }
      }
    }),
    getDashboardSales: builder.query({
      query:({startDate,endDate})=>`/admin/get_sales?${startDate}&endDate=${endDate}`
    }),
    getAdminOrders: builder.query({
      query:()=>`/admin/orders`,
      providesTags:["AdminOrders"]
    }),
    updateOrder: builder.mutation({
      query({id,body}) {
        return {
          url: `/admin/orders/${id}`,
          method: "PUT",
          body,
        }
      },
      invalidatesTags:["Order"]
    }),
    deleteOrder: builder.mutation({
      query(id) {
        return {
          url: `/admin/orders/${id}`,
          method: "DELETE",
          
        }
      },
      invalidatesTags:["AdminOrders"]
    }),
  }),
});

export const { useCreateNewOrderMutation,useStripeCheckoutSessionMutation,useMyOrdersQuery,useOderDetailsQuery,
  useLazyGetDashboardSalesQuery,useGetAdminOrdersQuery,useUpdateOrderMutation,useDeleteOrderMutation
} = orderApi;