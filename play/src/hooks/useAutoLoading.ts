import { ref } from "vue";

export function useAutoLoading(defaultLoading = false) {
  const ld = ref(defaultLoading);

  function run(requestPromise: Promise<any>) {
    ld.value = true;
    return requestPromise.finally(() => {
      ld.value = false;
    });
  }
  return [ld, run];
}
