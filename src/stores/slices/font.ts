import {createSlice} from "@reduxjs/toolkit";
import {AppState} from "@/stores/store";

export type TFont = {
    className: string;
}

const initialState: TFont = {
  className: ''
};

export const fontSlice = createSlice({
  name: "font_slice",
  initialState,
  reducers: {
    setFontClassName(state, action) {
      state.className = action.payload;
    }
  }
});
export const {setFontClassName} = fontSlice.actions;

export const getFontClassName = (state: AppState) => state.font_slice.className;

export default fontSlice.reducer;
