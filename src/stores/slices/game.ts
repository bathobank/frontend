import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "@/stores/store";

export type TGame = {
  game_open: string;
};

const initialState: TGame = {
  game_open: "",
};

export const gameSlice = createSlice({
  name: "game_slice",
  initialState,
  reducers: {
    setGameOpen(state, action) {
      state.game_open = action.payload;
    },
  },
});
export const { setGameOpen } = gameSlice.actions;

export const getGameOpen = (state: AppState): string =>
  state.game_slice.game_open;

export default gameSlice.reducer;
