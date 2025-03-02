## scss @import和@use的区别
https://juejin.cn/post/7258495816732852279

@use "mixins/mixins.scss" as *;命名空间

## css span设置display:inline-block
设置为行内块元素，保证inline元素依然不独占一行，同时可以设置宽高、transform

- Block元素与Inline元素的区别？
Block元素：
默认情况下，会独占一行。
可以设置宽度（width）和高度（height）。
可以设置外边距（margin）和内边距（padding）会影响到布局。
可以设置背景颜色（background-color）。
Inline元素：
不会独占一行，可以和其他inline元素并排显示。
默认情况下，宽度（width）和高度（height）设置为auto，不能直接设置。
可以设置外边距（margin）的左右方向，但垂直方向的对其他inline元素无效。
内边距（padding）的设置会影响行高（line-height），但不改变元素的总宽度或高度。
可以设置背景颜色（background-color）。

## svg fill属性
https://blog.csdn.net/wenrui7868/article/details/135656766

## tree-shaking问题

withinstall存在函数副作用（修改外部传入的对象），导致组件模块出现副作用（除了导出组件之外还修改了组件实例属性），通过该函数调用后的组件无法被tree-shaking优化
使用sideEffects：false解决或者修改函数为非副作用函数(无法使comp本身是组件也是插件)
```js
export function withInstall(comp) {
  // comp本身是组件也是插件
  // comp.install = (app: App) => {
  //   const { name } = comp;
  //   app.component(name, comp);
  // };
  // return comp;

  const obj = {
    install(app: App) {
      const { name } = comp;
      app.component(name, comp);
    },
  };

  return obj;
}
```

函数副作用：
https://www.jianshu.com/p/2c2bdf278786
Tree-Shaking失效：
https://blog.csdn.net/miaomiao_1024/article/details/138678650
https://blog.csdn.net/weixin_45695430/article/details/124962429
sideEffects：
https://www.cnblogs.com/bq-med/articles/18547686

## 扁平化数组
深度优先、先序遍历、按照props传入的层级拍平需要展开的数组，获取一维数组直接进行渲染

## vite使用jsx提示React is not defined
pnpm i @vitejs/plugin-vue-jsx -D