import type { ExtractPropTypes, InjectionKey, PropType } from "vue";
import type { Arrayable, FormItemContext, FormItemRule } from "./formItem";

export const formProps = {
    model: Object,
    rules: [Object, Array] as PropType<Arrayable<FormItemRule>>,
    showMessage: {
        type: Boolean,
        default: true
    }
} as const;

export type FormPropsType = Partial<ExtractPropTypes<typeof formProps>>;

export interface FormContext extends FormPropsType {
    addField: (context: FormItemContext) => void
}

export const FormContextKey: InjectionKey<FormContext> = Symbol("form")
