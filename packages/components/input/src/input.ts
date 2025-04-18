import { ExtractPropTypes, PropType } from "vue";
import { isString } from '@vue/shared'

export const inputProps = {
    modelValue: {
        type: String,
        default: "",
    },
    placeholder: {
        type: String,
        default: "请输入",
    },
    readonly: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'text'
    },
    clearable: {
        type: Boolean,
        default: false
    },
} as const;

export const inputEmits = {
    'update:modelValue': (value: string) => isString(value),
    'input': (value: string) => isString(value),
    'change': (value: string) => isString(value),
    'focus': (e: FocusEvent) => e instanceof FocusEvent,
    'blur': (e: FocusEvent) => e instanceof FocusEvent,
    'clear': () => true // 清空事件
};

export type iconProps = ExtractPropTypes<typeof inputProps>;
