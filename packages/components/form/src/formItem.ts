import type { RuleItem } from "async-validator";
import { ExtractPropTypes, InjectionKey, PropType } from "vue";

export type Arrayable<T> = T | T[];

export interface FormItemRule extends RuleItem {
  trigger?: Arrayable<string>;
}

export const FormItemProps = {
  prop: String,
  label: String,
  rules: [Object, Array] as PropType<Arrayable<FormItemRule>>,
  showMessage: {
    type: Boolean,
    default: true,
  },
} as const;

export type FormItemProps = Partial<ExtractPropTypes<typeof FormItemProps>>;

export interface FormItemContext extends FormItemProps {
  validate: (
    trigger: string,
    callback?: (isValid: boolean) => void,
  ) => Promise<any>;
}

export const FormItemContextKey: InjectionKey<FormItemContext> =
  Symbol("form-item");

export const formItemValidateState = ["success", "error", ""] as const;
export type FormItemValidateState = (typeof formItemValidateState)[number];
