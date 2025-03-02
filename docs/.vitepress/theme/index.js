import DefaultTheme from "vitepress/theme";

import globalComponent from "@dnhy/components/index.ts";
import "@dnhy/theme-chalk/src/index.scss";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(globalComponent);
  },
};
