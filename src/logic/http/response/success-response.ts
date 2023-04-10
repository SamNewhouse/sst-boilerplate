import { ApiResponse, ResponseHeaders } from "foundation/types";
import { response } from "./response";

export const successResponse = <T = unknown>(
  body?: T,
  headers?: ResponseHeaders,
): ApiResponse => {
  return response(200, body || "", headers);
};
