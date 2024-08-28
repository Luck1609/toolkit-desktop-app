import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiResponse, ErrorResponse, HttpMethods } from "./interface";
import { getBaseURL } from "./utils";



function handle_success_response<D>(result: AxiosResponse<any, any>): ApiResponse<D> {
  return {
    status: 'success',
    data: result?.data,
    message: result.data?.message
  }
}


function handle_error_response(error: unknown): ErrorResponse {
  if (error instanceof AxiosError) return {
      status: 'error',
      description: error.response?.data?.message,
      title: error.response?.data?.name
    };

  return {
    status: 'error',
    title: "Unknown error",
    description:
      "🚧 This is not your normal error. Please contact the developer to fix this ASAP! 👷",
  };
}

type RequestHandler<T> = {
  url: string;
  payload?: T | undefined;
  options: AxiosRequestConfig | undefined;
  method: "get" | "post" | "patch" | "delete";
};

class HttpReq implements HttpMethods {
  http;

  constructor() {
    this.http = axios.create({
      baseURL: getBaseURL(),
    });

    this.http.defaults.withCredentials = true;
    this.http.defaults.withXSRFToken = true;
    this.http.interceptors.request.use(
      function (config) {
        config.headers["Content-Type"] =
          config.data instanceof FormData
            ? "multipart/formdata"
            : "application/json";
          // config.headers['Accept'] = "application/json";
        return config;
      },
      function (error) {
        return error.response;
      },
    );
  }

  request_handler = async <T, D>({
    url,
    payload,
    options,
    method,
  }: RequestHandler<T>): Promise<ApiResponse<D> | ErrorResponse> => {
    try {
      const result = await this.http[method as keyof HttpMethods](
        url,
        payload,
        options,
      );

      // console.log('Axios result', result.data)
      return handle_success_response<D>(result);
    } catch (error) {
      return handle_error_response(error);
    }
  };

  post = async <T>(url: string, payload: T, options?: AxiosRequestConfig) =>
    await this.request_handler({
      url,
      payload,
      options,
      method: "post",
    });

  patch = async <T>(url: string, payload: T, options?: AxiosRequestConfig) =>
    await this.request_handler({
      url,
      payload,
      options,
      method: "patch",
    });

  get = async <T>(url: string, options?: AxiosRequestConfig) =>
    await this.request_handler<any, T>({
      url,
      options,
      method: "get",
    });

  delete = async (url: string, options?: AxiosRequestConfig) =>
    await this.request_handler({
      url,
      options,
      method: "delete",
    });
}

const http = new HttpReq();

export default http;
