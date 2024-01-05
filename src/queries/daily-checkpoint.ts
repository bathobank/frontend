import { useMutation, useQuery } from "react-query";

import { TDailyCheckpointResponse } from "@/@types/daily-checkpoint";
import { DAILY_CHECKPOINT } from "@/utils/api-url";
import axiosInstance from "@/utils/axios";

const DAILY_CHECKPOINT_MUTATION_QK = "daily_checkpoint_mutation_query_key";
export const DAILY_CHECKPOINT_QK = "daily_checkpoint_query_key";

export const dailyCheckpointQuery = (): Promise<TDailyCheckpointResponse> => {
  return axiosInstance.get(DAILY_CHECKPOINT);
};

export const useDailyCheckpointQuery = ():
  | TDailyCheckpointResponse
  | undefined => {
  const { data } = useQuery({
    queryKey: [DAILY_CHECKPOINT_QK],
    queryFn: dailyCheckpointQuery,
    retry: 0,
    staleTime: Infinity,
  });

  return data;
};

export const dailyCheckpointMutation = () => {
  return axiosInstance.post(DAILY_CHECKPOINT);
};

export const useDailyCheckpointMutation = () => {
  return useMutation({
    mutationKey: [DAILY_CHECKPOINT_MUTATION_QK],
    mutationFn: dailyCheckpointMutation,
  });
};
