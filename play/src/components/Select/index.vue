<script setup name="DDemo" lang="ts">
import { Button } from "ant-design-vue";
import { getRemoteData, submitApi } from "../../api";
import { useAutoLoading } from "../../hooks/useAutoLoading";
import { useFetchSelect } from "../../hooks/useFetchSelect";
// 获取选择框内容
const { optLoading, optionsArr } = useFetchSelect({
  apiFun: getRemoteData,
});
// const [loading, submit] = useAutoRequest(submitApi) as any;

// async function onSubmit() {
//   try {
//     const res = await submit("aaa");
//     console.log("res :", res);
//   } catch (error) {
//     console.log("error2 :", error);
//   }
// }

const [loading, fetch] = useAutoLoading() as any;
async function onSubmit() {
  try {
    const res = await fetch(submitApi("aaaa1111"));
    console.log("res :", res);
  } catch (error) {
    console.log("error3 :", error);
  }
}
</script>

<template>
  <div>
    <a-select
      :loading="optLoading"
      :options="optionsArr"
      style="width: 220px"
    />
    <Button :loading="loading" @click="onSubmit">提交</Button>
  </div>
</template>

<style lang="scss"></style>
