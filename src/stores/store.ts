import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import { gameSlice } from "@/stores/slices/game";
import { navbarSlice } from "@/stores/slices/navbar";
import { cartSlice } from "@/stores/slices/store";
import { systemSettingSlice } from "@/stores/slices/system-setting";
import { userSlice } from "@/stores/slices/user";

const makeStore = () =>
  configureStore({
    reducer: {
      [cartSlice.name]: cartSlice.reducer,
      [gameSlice.name]: gameSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [navbarSlice.name]: navbarSlice.reducer,
      [systemSettingSlice.name]: systemSettingSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export const wrapper = createWrapper<AppStore>(makeStore);
