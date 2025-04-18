<!--  -->
<template>
    <div>
        <span v-if="slots.prefixIcon">
            <slot name="prefixIcon"></slot>
        </span>
        <input :type="type === 'password' && !showPwd ? 'password' : 'text'" v-bind="attrs" :placeholder="placeholder"
            @input="handleInput" @change="handleChange" @focus="handleFocus" @blur="handleBlur" ref="inputRef"
            :disabled="disabled" :clearable="clearable" :readonly="readonly">
        <span v-if="slots.suffixIcon">
            <slot name="suffixIcon"></slot>
        </span>

        <z-icon v-if="showClear" @click="clear">
            <CloseCircleOutline />
        </z-icon>

        <z-icon v-if="type === 'password'" @click="handlePasswordVisible">
            <Eye v-show="!showPwd" />
            <EyeOff v-show="showPwd" />
        </z-icon>
    </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useAttrs, watch } from 'vue';
import { CloseCircleOutline, Eye, EyeOff } from '@vicons/ionicons5';
import { inputProps, inputEmits } from './input'

defineOptions({
    name: 'z-input',
    inheritAttrs: false
})

const attrs = useAttrs();

const slots = defineSlots();

const props = defineProps(inputProps);
const emit = defineEmits(inputEmits);

const showPwd = ref(false);

const inputRef = ref<HTMLInputElement>();
const setNativeInputValue = () => {
    const inputEl = inputRef.value;
    if (!inputEl) return;

    inputEl.value = String(props.modelValue);
}

onMounted(() => {
    setNativeInputValue()
})

watch(() => props.modelValue, setNativeInputValue)

const showClear = computed(() => {
    return props.modelValue && props.clearable && !props.disabled && !props.readonly
})

const handlePasswordVisible = () => {
    showPwd.value = !showPwd.value;
    focus()
}

const handleInput = (e: InputEvent) => {
    const value = (e.target as HTMLInputElement).value
    emit('input', e)
    emit('update:modelValue', value)
}

const handleChange = (e: InputEvent) => {
    const value = (e.target as HTMLInputElement).value

    emit('change', value)
}

const handleFocus = (e: InputEvent) => {
    emit('focus', e);
}
const handleBlur = (e: InputEvent) => {
    emit('blur', e);
}


const focus = async () => {
    await nextTick() // 这里重新获取焦点
    inputRef.value?.focus();
}

const clear = () => {
    emit('update:modelValue', '');
    emit('change', '')
    emit('clear')
    focus();
}
</script>

<style lang="scss" scoped></style>