import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const ProductApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "http://localhost:5000/api/v1",
    credentials: "include" ,
  
  }), 
  tagTypes: ["Products","AdminProducts"],
  // credentials: "include" ,
  keepUnusedDataFor:30,
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url:"/products",
        params:{
          page:params?.page,
          keyword:params?.keyword,
          category:params?.category,
          "price[gte]":params.min,
          "price[lte]":params.max,
          "ratings[gte]":params?.ratings
        }
      }),
    }),
    getProductDetails: builder.query({
      query: (id) => `/product/${id}`,
      providesTags: ["Products"],
    }),
    submitReview: builder.mutation({
      query(body) {
        return {
          url: "/reviews",
          method: "PUT",
          body,
        }
      },
      invalidatesTags: ["Products"],
    }),
    canUserReview: builder.query({
      query: (productId) => `/can_review/productId=${productId}`,
      
    }),
    getAdminProducts: builder.query({
      query: () => `/admin/products`,
      providesTags:["AdminProducts"],
      
    }),
    createAdminProducts: builder.mutation({
     query(body){
      return {
        url:"/admin/products",
        method: "POST",
        body,
      };
     
     },
     invalidatesTags:["AdminProducts"],
      
    }),
    updateProducts: builder.mutation({
      query({id,body}){
       return {
         url:`/admin/product/${id}`,
         method: "PUT",
         body,
       };
      
      },
      invalidatesTags:["AdminProducts","Product"],
       
     }),
     uploadProductImage: builder.mutation({
      query({id,body}){
       return {
         url:`/admin/products/${id}/upload_images`,
         method: "PUT",
         body,
       };
      
      },
      invalidatesTags:["AdminProducts","Product"],
       
     }),
     deleteProductImage: builder.mutation({
      query({id, body}) {
        return {
          url: `/admin/products/${id}/delete_images`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: [ "Products"], 
    }),
    deleteProduct: builder.mutation({
      query(id) {
        return {
          url: `/admin/products/${id}/`,
          method: "DELETE",
   
        };
      },
      invalidatesTags: [ "AdminProducts"], 
    }),
  }),
});

export const { useGetProductsQuery,
  useGetProductDetailsQuery,
  useSubmitReviewMutation,
  useCanUserReviewQuery,
  useGetAdminProductsQuery,
  useCreateAdminProductsMutation,
  useUpdateProductsMutation,
  useUploadProductImageMutation,
  useDeleteProductImageMutation,
  useDeleteProductMutation,
} = ProductApi;
