import { reactive, ref } from "vue";
interface IObj {
  [key: string]: string;
}

export function useForm(initState: IObj, validate: any) {
  const values = reactive<IObj>({ ...initState });
  const errors = ref<IObj>({});

  function handleChange(key: string, value: string) {
    errors.value[key] = validate(key, value);
  }

  function submitHandle(callback: (values: any) => void) {
    const validationErrors: IObj = {};
    Object.keys(values).forEach((key) => {
      validationErrors[key] = validate(key, values[key]);
    });

    errors.value = validationErrors;

    if (Object.values(errors.value).every((error) => !error)) {
      callback(values);
    }
  }

  return [values, errors, handleChange, submitHandle];
}
