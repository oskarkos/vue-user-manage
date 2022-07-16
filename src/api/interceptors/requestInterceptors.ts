// API
import { AxiosRequestConfig, AxiosError } from "axios";

const showErrorMessage = (title: string, message: string) => {
  console.log(title + " " + message);
};

export const requestInterceptor = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  const auxConfig = config;
  return auxConfig;
};

export const requestErrorInterceptor = (
  error: AxiosError
): Promise<AxiosError> => {
  console.log("requestErrorInterceptor", error.response);
  if (!error.response) {
    showErrorMessage("NETWORK ERROR", "Request unsendable");
    return Promise.reject(error);
  }

  return Promise.reject(error);
};
