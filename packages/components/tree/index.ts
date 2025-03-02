import _Tree from "./src/tree.vue";
import { withInstall } from "@dnhy/utils/with-install.js";

const zTree = withInstall(_Tree);

export { zTree };

export * from "./src/tree";
