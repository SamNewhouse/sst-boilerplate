import { projectName } from "foundation/config";
import { App } from "sst/constructs";
import { DatabaseStack } from "./database";

export default function main(app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs18.x",
    architecture: "arm_64",
  });

  app.stack(DatabaseStack, {
    stackName: `${projectName}--database`,
  });
}
