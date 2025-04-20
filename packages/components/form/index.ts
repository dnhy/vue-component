import _Form from "./src/form.vue";
import _FormItem from "./src/formItem.vue";

import { withInstall } from "@dnhy/utils/with-install.js";

const zForm = withInstall(_Form);
const zFormItem = withInstall(_FormItem);

export { zForm, zFormItem };

export * from "./src/form";
export * from "./src/formItem";
