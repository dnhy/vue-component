//   模拟调用接口
export function getRemoteData() {
  return new Promise<any[]>((resolve, reject) => {
    setTimeout(() => {
      // 模拟接口调用有概率出错
      if (Math.random() > 0.5) {
        resolve([
          {
            key: 1,
            name: "苹果",
            value: 1,
          },
          {
            key: 2,
            name: "香蕉",
            value: 2,
          },
          {
            key: 3,
            name: "橘子",
            value: 3,
          },
        ]);
      } else {
        reject(new Error("不小心出错了！"));
      }
    }, 3000);
  });
}

export function submitApi(text: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 模拟接口调用有概率出错
      if (Math.random() > 0.5) {
        resolve({
          status: "ok",
          text: text,
        });
      } else {
        reject(new Error("不小心出错了！"));
      }
    }, 3000);
  });
}
