import {toast} from "react-toastify";

type Position = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
type Theme = 'light' | 'dark' | 'colored';

type Config = {
  position?: Position;
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  theme?: Theme
}

const getConfig = (config?: Config): Config => {
  return {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    ...config
  }
}

export const useToast = () => {
  const success = (message: string, option?: Config) => {
    const config = getConfig(option);
    toast.success(message, config)
  }

  const warning = (message: string, option?: Config) => {
    const config = getConfig(option);
    toast.warn(message, config)
  }

  const error = (message: string, option?: Config) => {
    const config = getConfig(option);
    toast.error(message, config)
  }

  const info = (message: string, option?: Config) => {
    const config = getConfig(option);
    toast.info(message, config)
  }

  const normal = (message: string, option?: Config) => {
    const config = getConfig(option);
    toast(message, config)
  }

  return {
    success,
    warning,
    error,
    info,
    normal
  }
}
