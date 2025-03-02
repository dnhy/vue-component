<template>
  <div>
    <TransitionGroup name="list" tag="div" class="container">
      <div
        class="item"
        v-for="(item, i) in drag.list"
        :key="item.id"
        draggable="true"
        @dragstart="dragstart($event, i)"
        @dragend="dragend"
        @dragenter="dragenter($event, i)"
        @dragover="dragover"
      >
        {{ item.name }}
      </div>
    </TransitionGroup>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import { useDragList } from "../../hooks/useDragList";
const drag = reactive({
  list: [
    { name: "a", id: 1 },
    { name: "b", id: 2 },
    { name: "c", id: 3 },
    { name: "d", id: 4 },
    { name: "e", id: 5 },
  ],
});

const { dragstart, dragend, dragenter, dragover } = useDragList(drag.list);
</script>

<style lang="scss" scoped>
.list-move, /* 对移动中的元素应用的过渡 */
    .list-enter-active,
    .list-leave-active {
  transition: all 0.2s ease;
}
.item {
  width: 200px;
  height: 40px;
  line-height: 40px;
  // background-color: #f5f6f8;
  background-color: skyblue;
  text-align: center;
  margin: 10px;
  color: #fff;
  font-size: 18px;
}

.container {
  position: relative;
  padding: 0;
}

.moving {
  opacity: 0;
}
</style>
