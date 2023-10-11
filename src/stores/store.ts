import {fontSlice} from "@/stores/slices/font";
import {userSlice} from "@/stores/slices/user";
import {configureStore} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import {cartSlice} from "@/stores/slices/store";
import {loadingSlice} from "@/stores/slices/loading";
import {gameSlice} from "@/stores/slices/game";

const makeStore = () =>
  configureStore({
    reducer: {
      [cartSlice.name]: cartSlice.reducer,
      [loadingSlice.name]: loadingSlice.reducer,
      [gameSlice.name]: gameSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [fontSlice.name]: fontSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export const wrapper = createWrapper<AppStore>(makeStore);
