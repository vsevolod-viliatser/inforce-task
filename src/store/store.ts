import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "./commentSlice.ts";
import productReducer from "./productSlice.ts";

export const store = configureStore({
  reducer: {
    products: productReducer,
    comments: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
