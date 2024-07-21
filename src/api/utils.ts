import { AxiosError, AxiosResponse } from "axios";

export function getData(res: AxiosResponse) {
  return res.data.data;
}

export function getError(error: AxiosError<{ error: string }>): Promise<Error> {
  const errorMessage = error.response?.data?.error ?? "unknown error";
  return Promise.reject(new Error(errorMessage));
}

export function mapAxiosResponse<T>(res: Promise<AxiosResponse<T>>) {
  return res.then(getData).catch(getError);
}
