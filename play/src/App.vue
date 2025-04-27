<template>
  <router-view></router-view>

  <z-icon :color="'black'" size="30">
    <AddCircleOutline />
  </z-icon>
  <z-icon :color="'red'" size="50">
    <AddCircleOutline />
  </z-icon>
  <!-- <z-tree
    :data="data"
    lable-field="xx"
    key-field="prop"
    children-field="children"
    :defaultExpandedKeys="['41', '4130']"
  ></z-tree> -->
  {{ value }}
  <z-tree :data="data" :on-load="handleLoad" v-model:selected-keys="value" lable-field="xx" key-field="prop" selectable
    multiple>
    <template #="{ node }">
      {{ node?.key + "!!!!" }} -
      {{ node?.label }}
    </template>
  </z-tree>
  {{ inputVal }}
  <z-input type="password" v-model="inputVal" :disabled="false" :readonly="false" :clearable="true" @focus="onFocus"
    @blur="onBlur" @change="onChange" @input="onInput">

    <template v-slot:prefixIcon>
      <z-icon :color="'black'" size="30">
        <CloudyNightSharp />
      </z-icon>
    </template>
    <template v-slot:suffixIcon>
      <z-icon :color="'black'" size="30">
        <CloudyNightSharp />
      </z-icon>
    </template>
  </z-input>
  <!-- 这里的change是输入时触发 -->
  <z-form :model="userInfo" :rules="{
    userName: [
      // { required: true, message: 'Please input Form\'s userName', trigger: 'blur' },
      { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: ['change', 'blur'] },
      { type: 'string', whitespace: true, message: 'Only contain Whitespace is not allowed' }]
  }">
    <z-formItem label="用户名" prop="userName" :rules="[{
      required: true,
      message: 'Please enter your userName',
      trigger: 'blur',
    }]">
      <z-input v-model="userInfo.userName" />
    </z-formItem>
    <z-formItem label="密码" prop="password">
      <z-input v-model="userInfo.password" type="password" />
    </z-formItem>
  </z-form>

  <z-upload action="http://localhost:4000/upload" :before-upload="handleBeforeUpload" :on-change="handleChange" muliple>
    <button>上传</button>
  </z-upload>

  <z-virtual-scroll-list class="virtual-list" :data-sources="items" data-key="id" :keeps="30" :estimate-size="80"
    :dataComponent="(Item as DefineComponent<{}, {}, any>)">
  </z-virtual-scroll-list>
</template>

<script setup lang="ts">
import type { TreeOption } from "@dnhy/components/tree";
import { AddCircleOutline, CloudyNightSharp } from "@vicons/ionicons5";
import { computed, reactive, ref, watch, type DefineComponent } from "vue";
import type { key } from "@dnhy/components/tree";
import { Random } from 'mockjs';
import Item from './Item.vue'

const handleBeforeUpload = () => {
  return true
}
const handleChange = () => {

}
const userInfo = reactive({
  userName: '',
  password: ''
})

const inputVal = ref('111');

function createData(level = 4, parentKey = ""): any {
  if (!level) return [];
  const arr = new Array(16 - level).fill(0);
  return arr.map((_, idx: number) => {
    const key = parentKey + level + idx;
    return {
      xx: createLabel(level), // 显示的内容
      prop: key, // 为了唯一性
      children: createData(level - 1, key), // 孩子
    };
  });
}
function createLabel(level: number): string {
  if (level === 4) return "道生一";
  if (level === 3) return "一生二";
  if (level === 2) return "二生三";
  if (level === 1) return "三生万物";
  return "";
}

const data = ref(createData());
const value = ref<key[]>([]);

// function createData() {
//   return [
//     {
//       label: nextLabel(),
//       key: 1,
//       isLeaf: false, // 这里isLeaf 为false 表示点击的时候动态的加载子节点
//     },
//     {
//       label: nextLabel(),
//       key: 2,
//       isLeaf: false,
//     },
//   ];
// }
function nextLabel(currentLabel?: string | number): string {
  if (!currentLabel) return "Out of Tao, One is born";
  if (currentLabel === "Out of Tao, One is born") return "Out of One, Two";
  if (currentLabel === "Out of One, Two") return "Out of Two, Three";
  if (currentLabel === "Out of Two, Three") {
    return "Out of Three, the created universe";
  }
  if (currentLabel === "Out of Three, the created universe") {
    return "Out of Tao, One is born";
  }
  return "";
}

function handleLoad(node: TreeOption) {
  return new Promise<TreeOption[]>((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          label: nextLabel(node.label),
          key: node.key + nextLabel(node.label),
          isLeaf: false,
        },
      ]);
    }, 1000);
  });
}

function onFocus(e) {
  console.log('onFocus :', e);

}

function onBlur(e) {
  console.log('onBlur :', e);

}

function onChange(e) {
  console.log('onChange :', e);
}

function onInput(e) {
  console.log('onInput :', e);

}
const totalCount = 100;
interface DataType {
  id: number,
  name: string,
  desc: string,
  index: number
}
const vData: DataType[] = []
let index = 0;
while (index !== totalCount) {
  vData.push({
    id: index,
    name: Random.name(),
    desc: Random.csentence(20, 120),
    index
  })
  index++;
}

const items = ref(vData);

</script>

<style lang="scss" scoped>
.virtual-list {
  width: 100%;
  height: 550px;
  overflow-y: scroll;
  border: 3px solid red
}
</style>
