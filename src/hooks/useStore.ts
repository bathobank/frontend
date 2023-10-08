import {useDispatch, useSelector} from "react-redux";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const useStore = () => {
  const dispatch = useDispatch();
  const selector = useSelector;

  const get = (hook: any) => {
    return selector(hook);
  }

  const set = (hook: any) => {
    return dispatch(hook);
  }

  return {
    get,
    set
  }
}
