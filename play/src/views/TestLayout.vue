<template>
  <div class="parent">
    <div class="child2"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.parent {
  width: 100vw;
  height: 100vh;
  background-color: aqua;
  position: relative;
  .child {
    width: 200px;
    height: 100px;
    background-color: red;
    // 原本margin:auto只能在水平位置自动计算，开启绝对定位会使四个方向都可以自动计算
    position: absolute; //使得 .child 元素在 .parent 元素中能够自由调整位置。
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto; //使得 .child 元素在四个方向的边距均为自动计算。浏览器会自动计算这些边距
  }
  .child2 {
    width: 200px;
    height: 100px;
    background-color: red;
    position: absolute;
    left: 50%;
    top: 50%;
    // transform: translate(-50%, -50%);
    margin: -50px -100px;
  }
}
</style>
