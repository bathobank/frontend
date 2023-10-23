import {USER_HISTORIES} from "@/utils/api-url";
import axiosInstance from "@/utils/axios";
import {useQuery} from "react-query";
import {THistoriesQuery} from "@/@types/history";

const USER_HISTORIES_QK: string = 'user_histories_query_key';

export const userHistories = (): Promise<THistoriesQuery> => {
  return axiosInstance.get(USER_HISTORIES);
}

export const useUserHistories = (): THistoriesQuery | undefined => {
  const {data} = useQuery({
    queryKey: [USER_HISTORIES_QK],
    queryFn: userHistories
  });
  return data;
}
