import { TOP_WEEK } from "@/utils/api-url";
import axiosInstance from "@/utils/axios";
import { useQuery } from "react-query";
import { TTopWeekResponse } from "@/@types/top-week";

export const TOP_WEEK_QK: string = "top_week_query_key";

export const topWeekQuery = (): Promise<TTopWeekResponse> => {
  return axiosInstance.get(TOP_WEEK);
};

export const useTopWeekQuery = (): TTopWeekResponse | undefined => {
  const { data } = useQuery({
    queryKey: [TOP_WEEK_QK],
    queryFn: () => topWeekQuery(),
    retry: 0,
    staleTime: 5000,
  });
  return data;
};
