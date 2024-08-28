export interface HttpMethods {
  post: (url: string, payload: object, options?: object) => Promise<any>;
  patch: (url: string, payload: object, options?: object) => Promise<any>;
  get: (url: string, options?: object) => Promise<any>;
  delete: (url: string) => Promise<any>;
}

export interface ApiResponse<T> {
  status: 'success';
  message?: string;
  data: T;
}

export interface ErrorResponse {
  status: 'error';
  title: string;
  description: string;
};
