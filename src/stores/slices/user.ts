import { TUser } from "@/@types/user";
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "@/stores/store";

export type TUserState = {
  user: TUser | null;
  logined: boolean;
};

const initialState: TUserState = {
  user: null,
  logined: false,
};

export const userSlice = createSlice({
  name: "user_slice",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.logined = !!action.payload;
    },
  },
});
export const { setUser } = userSlice.actions;

export const getUser = (state: AppState) => state.user_slice.user;
export const getLogined = (state: AppState) => state.user_slice.logined;

export default userSlice.reducer;
