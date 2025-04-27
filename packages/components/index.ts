import _Icon from "@dnhy/components/icon/src/icon.vue";
import _Tree from "@dnhy/components/tree/src/tree.vue";
import _Minirefresh from "@dnhy/components/minirefresh/src/minirefresh.vue";
import _Input from '@dnhy/components/input/src/input.vue'
import _form from '@dnhy/components/form/src/form.vue'
import _formItem from '@dnhy/components/form/src/formItem.vue'
import _upload from '@dnhy/components/upload/src/upload.vue'
import _virtualList from '@dnhy/components/virtual-scroll-list/src/virtual-list'

import type { App } from "vue";

export * from "./icon/index";
export * from "./tree/index";
export * from "./minirefresh/index";
export * from "./input/index";
export * from "./form/index";
export * from "./upload/index";
export * from "./virtual-scroll-list/index";

const components = [_Icon, _Tree, _Minirefresh, _Input, _form, _formItem, _upload, _virtualList];

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
    zForm: typeof _form;
    zFormItem: typeof _formItem;
    zUpload: typeof _upload;
    ZVirtualScrollList: typeof _virtualList;
  }
}
