import { ApiResponse, ResponseHeaders } from "foundation/types";

export const response = <T = unknown>(
  statusCode: number,
  body: T,
  headers?: ResponseHeaders,
): ApiResponse => {
  return {
    statusCode,
    headers: {
      ...headers,
    },
    body: JSON.stringify(body, null, 2),
  };
};
