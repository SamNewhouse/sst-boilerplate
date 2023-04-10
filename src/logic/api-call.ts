import { AxiosError, AxiosResponse } from "axios";
import { OriginClientApiResponse } from "foundation/types";

export const apiCall = async (
  request: Promise<AxiosResponse<unknown>>,
  generateResponse: (response: AxiosResponse) => OriginClientApiResponse,
): Promise<OriginClientApiResponse> => {
  try {
    return generateResponse(await request);
  } catch (e) {
    if (e instanceof AxiosError && e.response) {
      return generateResponse(e.response);
    }

    throw e;
  }
};
