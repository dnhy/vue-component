import _Icon from "@dnhy/components/icon/src/icon.vue";
import _Tree from "@dnhy/components/tree/src/tree.vue";
import _Minirefresh from "@dnhy/components/minirefresh/src/minirefresh.vue";
import _Input from '@dnhy/components/input/src/input.vue'

import type { App } from "vue";

export * from "./icon/index";
export * from "./tree/index";
export * from "./minirefresh/index";
export * from "./input/index";

const components = [_Icon, _Tree, _Minirefresh, _Input];

const obj = {
  install(app: App) {
    components.forEach((comp) => {
      const { name } = comp as { name: string };

      app.component(name, comp);
    });
  },
};

export default obj;

// 扩展vue类型：定义全局组件类型，提供代码提示
declare module "vue" {
  //和全局组件默认类型合并
  export interface GlobalComponents {
    zIcon: typeof _Icon;
    zTree: typeof _Tree;
    zMinirefresh: typeof _Minirefresh;
    zInput: typeof _Input;
  }
}
