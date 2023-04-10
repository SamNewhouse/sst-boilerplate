import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { ApiController } from "foundation/types";
import { response } from "..";

export const apiGatewayController = (handler: ApiController): ApiController => {
  return async function (event: APIGatewayProxyEvent, ctx: Context) {
    try {
      const res = await handler(event, ctx);
      return res;
    } catch (err) {
      return response.systemError();
    }
  };
};
