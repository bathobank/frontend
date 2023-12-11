import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import { fontSlice } from "@/stores/slices/font";
import { gameSlice } from "@/stores/slices/game";
import { navbarSlice } from "@/stores/slices/navbar";
import { cartSlice } from "@/stores/slices/store";
import { userSlice } from "@/stores/slices/user";

const makeStore = () =>
  configureStore({
    reducer: {
      [cartSlice.name]: cartSlice.reducer,
      [gameSlice.name]: gameSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [fontSlice.name]: fontSlice.reducer,
      [navbarSlice.name]: navbarSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export const wrapper = createWrapper<AppStore>(makeStore);
