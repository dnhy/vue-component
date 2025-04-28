<template>
  <div>
    <form @submit.prevent="submitHandle(onSubmit)">
      <div>
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="values.username"
          @input="
            handleChange('username', ($event.target as HTMLInputElement).value)
          "
        />
        <span>
          {{ errors.username }}
        </span>
      </div>
      <div>
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="values.password"
          @input="
            handleChange('password', ($event.target as HTMLInputElement).value)
          "
        />
        <span>
          {{ errors.password }}
        </span>
      </div>
      <div>
        <button>submit</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "../hooks/useForm";

const initState = {
  username: "",
  password: "",
};

const validate = (key: string, value: string) => {
  if (key === "username" && !value) {
    return "username is required!";
  }
  if (key === "username" && value.length < 3) {
    return "username is too short!";
  }
  if (key === "password" && !value) {
    return "password is required!";
  }

  return "";
};

const [values, errors, handleChange, submitHandle] = useForm(
  initState,
  validate,
) as any;

function onSubmit(values: any) {
  console.log("submit data:" + JSON.stringify(values));
}
</script>

<style lang="scss" scoped></style>
