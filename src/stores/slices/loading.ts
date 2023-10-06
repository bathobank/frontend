import {createSlice} from "@reduxjs/toolkit";
import {AppState} from "@/stores/store";

export type TLoading = {
    isLoading: boolean;
}

const initialState: TLoading = {
  isLoading: true
};

export const loadingSlice = createSlice({
  name: "loading_slice",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    }
  }
});
export const {setIsLoading} = loadingSlice.actions;

export const getIsLoading = (state: AppState) => state.loading_slice.isLoading;

export default loadingSlice.reducer;
