/* eslint-disable @typescript-eslint/no-explicit-any */

export type TErrorData = {
  error: string;
  errorType: string;
  id: string | null;
  message: any;
  path: string;
  statusCode: number;
  [key: string]: string | number | null | any;
};

class ResponseError extends Error {
  data: TErrorData | undefined;
  constructor(message: string, data: TErrorData | undefined) {
    super(message);
    this.data = data;
  }
}

export default ResponseError;
