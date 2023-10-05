import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postAPI = createApi({
  reducerPath: "postAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1" }),
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  endpoints: (builder) => ({
    signUpUser: builder.mutation({
      query: (data) => ({
        url: "users/signUp",
        method: "post",
        body: "data",
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "post",
        body: data,
      }),
    }),
    Verification:builder.mutation({
      query: (data) => ({
        url: "/users/signUpVerification",
        method:"post",
        body:data,
      }),
    }),
    getCurrentUser:builder.query({
      query:(data) => ({
        url:"/users/auth",
        method:"get",
      })
    }),
    logout:builder.query({
      query:(data) => ({
        url:"/user/logout",
        method:"get",
        body:data,
      })
    })

  }),
});


export const {
  useSignUpUserMutation,
  useLoginUserMutation,
  useVerificationMutation,
  useGetCurrentUserQuery,
  useLogoutQuery,
} = postAPI;
