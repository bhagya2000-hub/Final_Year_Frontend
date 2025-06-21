import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setLoading, setIsAuthenticated, setUser } from "../feature/userSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    
    credentials: "include"
  }),
  tagTypes:["User","AdminUsers","AdminUser"],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => `/me`,
      transformResponse: (result) => result.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setIsAuthenticated(true));
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setUser(null));
          dispatch(setIsAuthenticated(false));
          dispatch(setLoading(false));
          console.log(error);
        }
      },
      providesTags:["User"],
    }),
   
    updateProfile: builder.mutation({
      query: (body) => ({
        url: "/me/update",
        method: "PUT",
        body,
      }),
      invalidatesTags:["User"],
    }),
    uploadAvatar: builder.mutation({
      query: (body) => ({
        url: "/me/upload_avatar",
        method: "POST",
        body,
      }),
      invalidatesTags:["User"],
    }),
    updatePassword: builder.mutation({
      query: (body) => ({
        url: "/password/update",
        method: "PUT",
        body,
      }),
      
     
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/password/forgot",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({token,body}) => ({
        url: `/password/reset/${token}`,
        method: "PUT",
        body,
      }
    ),
      
    }),
    getAdminUsers: builder.query({
      query:()=>`/admin/users`,
      providesTags:["AdminUsers"]
    }),
    getUserDetails: builder.query({
      query: (id) => `/admin/users/${id}`,
      providesTags:["AdminUser"]
    }),

    updateUser:builder.mutation({
      query({id,body}){
       return{
        url:`/admin/users/${id}`,
        method:"PUT",
        body,
       }
      },
      invalidatesTags:["AdminUsers"]
    }),
    deleteUser:builder.mutation({
      query(id){
       return{
        url:`/admin/users/${id}`,
        method:"DELETE",
      
       }
      },
      invalidatesTags:["AdminUsers"]
    })
  }),
});

export const { 
  useGetMeQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetAdminUsersQuery,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,

} = userApi;