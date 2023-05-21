import { ApiResponse, ResponseHeaders } from "foundation/types";
import { response } from "./response";

export const systemErrorResponse = (
  body?: unknown,
  headers?: ResponseHeaders,
): ApiResponse => {
  return response(500, body, headers);
};
