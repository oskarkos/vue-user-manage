import { AxiosError, AxiosResponse } from "axios";

const showErrorMessage = (title: string, message: string) => {
  console.log(title + " " + message);
};

export const reponseInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

export const responseErrorInterceptor = async (
  error: AxiosError
): Promise<AxiosError> => {
  if (!error.response) {
    showErrorMessage("NETWORK ERROR", "API unreachable.");
    localStorage.getItem("user") ? localStorage.removeItem("user") : null;
    location.reload();
    return Promise.reject(error);
  }
  const { status } = error.response;
  const { message } = error;

  switch (status) {
    case 401:
      localStorage.getItem("user") ? localStorage.removeItem("user") : null;
      location.reload();
      break;
    default:
      showErrorMessage("SERVER ERROR", `${message}`);
      break;
  }

  return Promise.reject(error);
};
