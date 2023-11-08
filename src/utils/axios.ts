import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

axiosInstance.interceptors.request.use(config => {
  const token = typeof window === 'object' ? window.localStorage.getItem('customer-token') : null;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  function (response) {
    return typeof response.data == 'object' ? response.data : response;
  }, function (error) {
    if (!error.response) return Promise.reject(error);
    if (!error.response.data) return Promise.reject(error.response);
    if (error.response.status === 401 && typeof window === 'object') {
      window.localStorage.removeItem('customer-token');
    }
    return Promise.reject({...error.response.data, responseStatus: error.response.status});
  }
);

export default axiosInstance;
