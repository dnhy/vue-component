import { withInstall } from "@dnhy/utils/with-install.js";
import _upload from "./src/upload.vue";

const zUpload = withInstall(_upload);

export { zUpload };

export * from "./src/upload";
