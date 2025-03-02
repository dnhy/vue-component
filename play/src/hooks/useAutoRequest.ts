import { ref } from "vue";

export function useAutoRequest(fun: any) {
  const loading = ref(false);
  const run = async function (...params: any) {
    try {
      loading.value = true;
      const res = await fun(...params);
      return res;
    } finally {
      // catch (error) {
      //   console.error("error :", error);
      // }
      loading.value = false;
    }

    // loading.value = true;
    // return (
    //   fun(...params)
    //     .then((res: any) => {
    //       return res;
    //     })
    //     //   .catch((error: any) => {
    //     //     console.error("error :", error);
    //     //   })
    //     .finally(() => {
    //       loading.value = false;
    //     })
    // );
  };

  return [loading, run];
}
