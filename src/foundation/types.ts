import { APIGatewayProxyEvent, Context } from "aws-lambda";

export type OriginClientApiResponse = {
  statusCode: number;
  headers: { [k: string]: string };
  body: string;
};

export interface OriginClient {
  makeRequest: (
    data: {
      query: { [name: string]: string | undefined } | null;
      body: string | null;
    },
  ) => Promise<OriginClientApiResponse>;
}

export type ApiEvent = APIGatewayProxyEvent;

export type ApiController = (
  event: APIGatewayProxyEvent,
  ctx: Context,
) => Promise<ApiResponse>;

export type ApiResponse = {
  statusCode: number;
  headers?: ResponseHeaders;
  body: string;
};
export type ResponseHeaders = { [key: string]: string | number | boolean };
