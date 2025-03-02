<template>
  <van-form @submit="onSubmit" @failed="onFailed">
    <van-cell-group inset>
      <!-- 通过 pattern 进行正则校验 -->
      <van-field
        v-model="form.value1"
        name="pattern"
        placeholder="正则校验"
        :rules="[{ pattern, message: '请输入正确内容' }]"
      />
      <!-- 通过 validator 进行函数校验 -->
      <van-field
        v-model="form.value2"
        name="validator"
        placeholder="函数校验"
        :rules="[{ validator, message: '请输入正确内容' }]"
      />
      <!-- 通过 validator 返回错误提示 -->
      <van-field
        v-model="form.value3"
        name="validatorMessage"
        placeholder="校验函数返回错误提示"
        :rules="[{ validator: validatorMessage }]"
      />
      <!-- 通过 validator 进行异步函数校验 -->
      <van-field
        v-model="form.value4"
        name="asyncValidator"
        placeholder="异步函数校验"
        :rules="[{ validator: asyncValidator, message: '请输入正确内容' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import {
  Button,
  CellGroup,
  Field,
  Form,
  closeToast,
  showLoadingToast,
} from "vant";

export default {
  components: {
    [Button.name as string]: Button,
    [Field.name as string]: Field,
    [Form.name as string]: Form,
    [CellGroup.name as string]: CellGroup,
  },
  setup() {
    const form = reactive({
      value1: "",
      value2: "",
      value3: "abc",
      value4: "",
    });
    const pattern = /\d{6}/;

    // 校验函数返回 true 表示校验通过，false 表示不通过
    const validator = (val: string) => /1\d{10}/.test(val);

    // 校验函数可以直接返回一段错误提示
    const validatorMessage = (val: string) => {
      if (val.length < 3) {
        return `${val} 不合法，请重新输入`;
      } else {
        return "";
      }
    };

    // 校验函数可以返回 Promise，实现异步校验
    const asyncValidator = (val: string) =>
      new Promise((resolve) => {
        showLoadingToast("验证中...");

        setTimeout(() => {
          closeToast();
          resolve(val === "1234");
        }, 1000);
      });

    const onSubmit = (values: any) => {
      console.log("submit", values);
    };

    const onFailed = (errorInfo: any) => {
      console.log("failed", errorInfo);
    };

    return {
      form,
      pattern,
      onSubmit,
      onFailed,
      validator,
      asyncValidator,
      validatorMessage,
    };
  },
};
</script>

<style lang="scss" scoped></style>
