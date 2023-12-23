import { useMutation } from "react-query";

import { USER_USE_GIFT_CODE } from "@/utils/api-url";
import axiosInstance from "@/utils/axios";

const USER_USE_GIFT_CODE_MUTATION_QK = "user_use_gift_code_mutation_query_key";

export const userUseGiftCode = ({
  giftcode,
  phone,
}: {
  giftcode: string;
  phone: string;
}) => {
  return axiosInstance.post(USER_USE_GIFT_CODE, { giftcode, phone });
};

export const useUserUseGiftCode = () => {
  return useMutation({
    mutationKey: [USER_USE_GIFT_CODE_MUTATION_QK],
    mutationFn: userUseGiftCode,
  });
};
