import { withInstall } from "@dnhy/utils/with-install.js";
import _virtualList from "./src/virtual-list";

const zVirtualList = withInstall(_virtualList);

export { zVirtualList };

export * from "./src/prop";
