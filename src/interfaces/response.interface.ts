export interface Response<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

export interface ResponseError {
  success: boolean;
  error: {
    statusCode: number;
    message: string;
    error: string;
  };
  timestamp: string;
}
