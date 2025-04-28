<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
    >
      <template v-slot:default>
        <!-- v-bind绑定对象，v-bind:a='b'绑定属性 -->
        <slot v-bind="listData"></slot>
      </template>
    </van-list>
  </van-pull-refresh>
</template>

<script setup lang="ts">
import { myFetch } from "@dnhy/utils/request";
import { computed, ref } from "vue";
import { miniProps } from "./minirefresh";

// 局部注册
// import { PullRefresh as vanPullRefresh, List as vanList } from "vant";
const refreshing = ref(false);
const listData = ref([{ name: "liu1" }, { name: "liu2" }]);
const loading = ref(false);
const finished = ref(false);
// 兼容写法
const props = defineProps(miniProps);

const currentPageIndex = ref(props.initPageIndex);
const currPageSize = computed(() => {
  return props.pageSize;
});

const onLoad = async () => {
  //模拟请求数据
  // setTimeout(() => {
  //   if (refreshing.value) {
  //     listData.value = [];
  //     refreshing.value = false;
  //   }
  //   for (let i = 0; i < 10; i++) {
  //     listData.value.push(listData.value.length + 1);
  //   }
  //   loading.value = false;
  //   if (listData.value.length >= 40) {
  //     finished.value = true;
  //   }
  // }, 1000);
  const res = await myFetch.post(
    props.url as string,
    props.dataRequest(
      currentPageIndex.value as number,
      currPageSize as unknown as number,
    ),
  );
  if (res.code === 200) {
    listData.value = props.dataChange(res);
  }
};

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};

defineOptions({
  name: "z-minirefresh",
});
</script>

<style lang="scss" scoped></style>
