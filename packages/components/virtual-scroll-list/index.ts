import _virtualList from "./src/virtual-list";
import { withInstall } from "@dnhy/utils/with-install.js";

const zVirtualList = withInstall(_virtualList);

export { zVirtualList };

export * from "./src/prop";
