import { useQuery } from "react-query";

import { TMissionResponse } from "@/@types/mission";
import { MISSION_URI } from "@/utils/api-url";
import axiosInstance from "@/utils/axios";

export const MISSION_GET_ALL_QK: string = "mission_get_all_query_key";

export const missionQuery = (): Promise<TMissionResponse> => {
  return axiosInstance.get(MISSION_URI);
};

export const useMissionQuery = (): TMissionResponse | undefined => {
  const { data } = useQuery({
    queryKey: [MISSION_GET_ALL_QK],
    queryFn: () => missionQuery(),
  });
  return data;
};
