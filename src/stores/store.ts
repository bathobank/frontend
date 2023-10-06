import {configureStore} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import {cartSlice} from "@/stores/slices/store";
import {loadingSlice} from "@/stores/slices/loading";

const makeStore = () =>
  configureStore({
    reducer: {
      [cartSlice.name]: cartSlice.reducer,
      [loadingSlice.name]: loadingSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export const wrapper = createWrapper<AppStore>(makeStore);
