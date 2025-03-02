import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
// 全局导入
// import globalComponent from "@dnhy/components";
import "@dnhy/theme-chalk/src/index.scss";
//按需导入
import { zIcon } from "@dnhy/components";
import { zTree } from "@dnhy/components";
import "vant/lib/index.css";
import { zMinirefresh } from "@dnhy/components";
// 按需引入
import { PullRefresh, List } from "vant";
import { Select } from "ant-design-vue";

const plugins = [zIcon, zTree, zMinirefresh];
const app = createApp(App);
plugins.forEach((plugin) => app.use(plugin));

// app.use(globalComponent);
// 全局注册
app.use(PullRefresh).use(List);
// app.component(PullRefresh.name!, PullRefresh).component(List.name!, List);
app.use(Select);
app.use(router);
app.mount("#app");
