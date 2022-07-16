import axios from "axios";

import {
  requestInterceptor,
  requestErrorInterceptor,
} from "../interceptors/requestInterceptors";
import {
  reponseInterceptor,
  responseErrorInterceptor,
} from "../interceptors/responseInterceptors";

const baseURL = import.meta.env.VITE_BASE_URL;

export const ApiAxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiAxiosInstanceWithoutAuth = axios.create({
  baseURL,
});

ApiAxiosInstance.interceptors.request.use(
  (config) => requestInterceptor(config),
  requestErrorInterceptor
);

ApiAxiosInstance.interceptors.response.use(
  reponseInterceptor,
  responseErrorInterceptor
);
