import {USER_HISTORIES} from "@/utils/api-url";
import axiosInstance from "@/utils/axios";
import {useQuery} from "react-query";
import {THistoriesQuery} from "@/@types/history";

const USER_HISTORIES_QK: string = 'user_histories_query_key';

export const userHistories = (limit: number = 5): Promise<THistoriesQuery> => {
  const url: string = USER_HISTORIES + '?limit=' + limit;
  return axiosInstance.get(url);
}

export const useUserHistories = (limit: number = 5): THistoriesQuery | undefined => {
  const {data} = useQuery({
    queryKey: [USER_HISTORIES_QK],
    queryFn: () => userHistories(limit),
    retry: 0
  });
  return data;
}
