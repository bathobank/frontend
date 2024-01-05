import { createSlice } from "@reduxjs/toolkit";

import { TSystemSetting } from "@/@types/system-setting";
import { AppState } from "@/stores/store";

export type TSystemSettingState = { settings: TSystemSetting };

const initialState: TSystemSettingState = {
  settings: {
    logo: "",
    author_name: "",
    "box-chat-link": "",
    "box-giftcode-link": "",
    "guide-link": "",
    suffix_title: "",
    icon: "",
    notification: "",
    games: {
      "1phan3": {},
      cltx: {},
      cltx2: {},
      doanso: {},
      gap3: {
        G3: {},
      },
      hieu3: {
        H3: {},
      },
      xien: {},
      tong3so: {
        S: {},
      },
    },
    daily_checkpoint: {
      active: false,
      min: 0,
      step: 0,
    },
  },
};

export const systemSettingSlice = createSlice({
  name: "system_setting_slice",
  initialState,
  reducers: {
    setSystemSetting(state, action) {
      state.settings = action.payload;
    },
  },
});

export const { setSystemSetting } = systemSettingSlice.actions;

export const getSystemSetting = (state: AppState) =>
  state.system_setting_slice.settings;

export default systemSettingSlice.reducer;
