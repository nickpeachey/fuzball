import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counters/counterSlice";
import { usersApi } from "./usersApi";

export const makeStore = () => {
    return configureStore({
        reducer: {
            counter: counterReducer,
            [usersApi.reducerPath]: usersApi.reducer,
        },
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(usersApi.middleware);
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];