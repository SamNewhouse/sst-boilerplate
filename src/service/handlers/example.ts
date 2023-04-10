import { APIGatewayProxyEvent } from "aws-lambda";
import { apiGatewayController, response } from "logic/http";

export const controller = async (event: APIGatewayProxyEvent) => {

  console.log("Lambda actioned: " + event.body)

  return response.success();
};

export const handler = apiGatewayController(controller);
