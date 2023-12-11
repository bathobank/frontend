import { SYSTEM_SETTING } from "@/utils/api-url";
import axiosInstance from "@/utils/axios";
import { useQuery } from "react-query";
import { TSystemSettingResponse } from "@/@types/system-setting";

export const SYSTEM_SETTING_QK: string = "system_setting_query_key";

export const systemSettingQuery = (): Promise<TSystemSettingResponse> => {
  return axiosInstance.get(SYSTEM_SETTING);
};

export const useSystemSettingQuery = (): TSystemSettingResponse | undefined => {
  const { data } = useQuery({
    queryKey: [SYSTEM_SETTING_QK],
    queryFn: () => systemSettingQuery(),
    retry: 0,
    staleTime: 10000,
  });
  return data;
};
