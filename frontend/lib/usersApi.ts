import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { get } from "http";

export const BASE_URL = "https://jsonplaceholder.typicode.com"; // ✅ add this export

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getUsers: builder.query<{ id: number; name: string }[], void>({
            query: () => "/users",
        }),
        getUserById: builder.query<{ id: number; name: string }[], number>({
            query: (id: number) => `/users/${id}`,
        }),
    }),
});

export const { useGetUsersQuery, useLazyGetUserByIdQuery } = usersApi;