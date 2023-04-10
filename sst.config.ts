import type { SSTConfig } from "sst";
import main from "./stack/index";

export default {
  config() {
    return {
      name: "sst-boilerplate",
      region: "eu-west-1",
    };
  },
  stacks(app) {
    main(app);
  },
} satisfies SSTConfig;
