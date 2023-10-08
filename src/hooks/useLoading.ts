import {setIsLoading} from "@/stores/slices/loading";
import {useDispatch} from "react-redux";

export const useLoading = () => {
  const dispatch = useDispatch();

  const removeLoading = () => {
    dispatch(setIsLoading(false))
  }

  const showLoading = () => {
    dispatch(setIsLoading(true));
  }

  return {
    hide: removeLoading,
    show: showLoading
  }
}
