import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "@/stores/store";

export type TNavbarStore = {
  isOpen: boolean;
};

const initialState: TNavbarStore = {
  isOpen: false,
};

export const navbarSlice = createSlice({
  name: "navbar_slice",
  initialState,
  reducers: {
    setOpenNavbar(state, action) {
      state.isOpen = action.payload;
    },
  },
});

export const { setOpenNavbar } = navbarSlice.actions;

export const getOpenNavbar = (state: AppState) => state.navbar_slice.isOpen;

export default navbarSlice.reducer;
