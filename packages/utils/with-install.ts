import { App } from "vue";

export function withInstall(comp) {
  // comp本身是组件也是插件
  comp.install = (app: App) => {
    const { name } = comp;
    app.component(name, comp);
  };
  return comp;

  // 消除函数副作用
  // const obj = {
  //   install(app: App) {
  //     const { name } = comp;
  //     app.component(name, comp);
  //   },
  // };

  // return obj;
}
