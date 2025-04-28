<template>
  <label>
    <slot name="label">
      {{ label }}
    </slot>
  </label>
  <div>
    <slot></slot>
    <div>
      <slot name="error">
        {{ validateMessage }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import AsyncValidator, { Values } from "async-validator";
import { computed, inject, provide, ref } from "vue";
import { FormContextKey } from "./form";
import {
  FormItemContext,
  FormItemContextKey,
  FormItemProps,
  FormItemRule,
  FormItemValidateState,
} from "./formItem";

defineOptions({
  name: "z-formItem",
});
const props = defineProps(FormItemProps);

const converArray = (rules) => {
  return rules ? (Array.isArray(rules) ? rules : [rules]) : [];
};

const _rules = computed(() => {
  const myRules = converArray(props.rules);
  const modelName = props.prop!;

  const formPropRules = formContext?.rules![modelName];

  return myRules.concat(formPropRules);
});

const getFilterRules = (trigger: string) => {
  const rules = _rules.value;
  return rules.filter((v: FormItemRule) => {
    if (!v.trigger || !trigger) return v;
    if (Array.isArray(v.trigger)) {
      return v.trigger.includes(trigger);
    } else {
      return v.trigger === trigger;
    }
  });
};

const validateState = ref<FormItemValidateState>(""); // success  s
const validateMessage = ref("");

const onValidateSuccess = () => {
  validateState.value = "success";
  validateMessage.value = "";
};

const onValidateError = (err: Values) => {
  validateState.value = "error";
  const { errors } = err;
  validateMessage.value = errors ? errors[0].message : "";
};
const formContext = inject(FormContextKey);

const validate: FormItemContext["validate"] = (trigger, callback) => {
  const rules = getFilterRules(trigger);
  const modelName = props.prop!;

  const validator = new AsyncValidator({
    [modelName]: rules,
  });

  const model = formContext?.model!;

  return validator
    .validate({ [modelName]: model[modelName] })
    .then(() => {
      onValidateSuccess();
    })
    .catch((err) => {
      onValidateError(err);
      return Promise.reject(err);
    });
};
const context: FormItemContext = {
  ...props,
  validate,
};

formContext?.addField(context);

provide(FormItemContextKey, context);
</script>

<style lang="scss" scoped></style>
