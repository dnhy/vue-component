import { ref, onMounted } from "vue";

interface FetchSelectProps {
  apiFun: () => Promise<any[]>;
}

// 把请求、加载中、错误这些处理逻辑封装到hook里；
export function useFetchSelect(props: FetchSelectProps) {
  const { apiFun } = props;
  const optLoading = ref(false);
  const optionsArr = ref<any[]>([]);

  function initSelect() {
    optLoading.value = true;
    apiFun()
      .then((data) => {
        optionsArr.value = data;
      })
      .catch((e) => {
        // 请求出线错误时将错误信息显示到select中，给用户一个友好的提示
        optionsArr.value = [
          {
            key: -1,
            value: -1,
            label: e.message,
            disabled: true,
          },
        ];
      })
      .finally(() => {
        optLoading.value = false;
      });
  }

  onMounted(() => {
    initSelect();
  });

  return {
    optLoading,
    optionsArr,
  };
}
