<template>
  <div>
    <DragList />

    <z-minirefresh
      url="http://www.baidu.com"
      :dataRequest="dataRequest"
      :dataChange="dataChange"
    >
      <!-- 这里必须标注template是用来放入插槽的 -->
      <template v-slot:default="listData">
        <div v-for="item in listData" :key="item.name">
          {{ item.name }}
        </div>
      </template>
    </z-minirefresh>

    <!-- <div class="col">
      <SkeletonView
        v-slot="{ result }"
        v-bind="view.bindProps"
        v-on="view.bindEvents"
      >
        <span>{{ result }}</span>
      </SkeletonView>
    </div> -->
    <Suspense>
      <AsyncComp />
    </Suspense>

    <Select />
  </div>
</template>

<script setup lang="ts">
import { useAutoSkeletonView } from "../hooks/useAutoSkeletonView";
import { getRemoteData } from "../api";
import AsyncComp from "../components/AsyncComp";
import Select from "../components/Select/index.vue";
import DragList from "../components/DragList/index.vue";

const view = useAutoSkeletonView({
  apiFun: getRemoteData,
});

function dataRequest() {}
function dataChange() {}
</script>

<style lang="scss" scoped></style>
