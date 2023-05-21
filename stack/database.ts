import * as cdk from "aws-cdk-lib";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as iam from "aws-cdk-lib/aws-iam";
import { projectName } from "foundation/config";
import { Api, Function, StackContext, Table } from "sst/constructs";
import { resourceNameGenerator } from "support/resource-name-generator";

export function DatabaseStack({ stack }: StackContext) {
  const resourceName = resourceNameGenerator(stack.stage, projectName);
  const exampleTableName = resourceName("example-table");

  const exampleTable = new Table(stack, "ExampleTable", {
    fields: {
      id: "string",
      createdAt: "string",
    },
    primaryIndex: {
      partitionKey: "id",
      sortKey: "createdAt",
    },
    cdk: {
      table: {
        tableName: exampleTableName,
        billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      },
    },
  });

  const exampleApiHandler = new Function(stack, "ExampleApiHandlerLambda", {
    functionName: resourceName("example-api-handler"),
    handler: "src/service/handlers/example.handler",
    initialPolicy: [
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["dynamodb:Query", "dynamodb:UpdateItem"],
        resources: [exampleTable.cdk.table.tableArn],
      }),
    ],
  });

  const exampleApi = new Api(stack, "ExampleApi", {
    routes: {
      "GET /v1/example": {
        cdk: {
          function: exampleApiHandler,
        },
      },
    },
  });

  const outputs = {
    exampleTableName: exampleTable.cdk.table.tableName,
    exampleTableArn: exampleTable.cdk.table.tableArn,
    exampleApiUrl: exampleApi.url,
  };

  stack.addOutputs(outputs);

  return outputs;
}
