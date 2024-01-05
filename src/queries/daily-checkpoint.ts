import { useMutation } from "react-query";

import { DAILY_CHECKPOINT } from "@/utils/api-url";
import axiosInstance from "@/utils/axios";

const DAILY_CHECKPOINT_MUTATION_QK = "daily_checkpoint_mutation_query_key";

export const dailyCheckpointMutation = () => {
  return axiosInstance.post(DAILY_CHECKPOINT);
};

export const useDailyCheckpointMutation = () => {
  return useMutation({
    mutationKey: [DAILY_CHECKPOINT_MUTATION_QK],
    mutationFn: dailyCheckpointMutation,
  });
};
