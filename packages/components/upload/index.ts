import _upload from "./src/upload.vue";
import { withInstall } from "@dnhy/utils/with-install.js";

const zUpload = withInstall(_upload);

export { zUpload };

export * from "./src/upload";
