import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TSystemSetting } from "@/@types/system-setting";
import {
  getSystemSetting,
  setSystemSetting,
  TSystemSettingState,
} from "@/stores/slices/system-setting";

export const useSystemSetting = (
  systemSetting?: TSystemSetting,
): TSystemSettingState => {
  const dispatch = useDispatch();
  const settings = useSelector(getSystemSetting);

  useEffect(() => {
    if (systemSetting) {
      dispatch(setSystemSetting(systemSetting));
    }
  }, [systemSetting, dispatch]);

  return { settings };
};
