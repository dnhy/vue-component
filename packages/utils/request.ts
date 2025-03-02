// import store from "@/store/index";
// import { refreshToken } from "./refresh";

import { CODE } from "./constants";

// const refreshFn = () => store.dispatch("refreshToken");
// const logoutFn = () => store.dispatch("logout");
const myFetch = {
  async post(url: string, data: any, headers?: any) {
    const reqFun = () => {
      return fetch(url, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(data),
      });
    };

    const response = await reqFun();
    const res = await response.json();

    if (res.code === CODE.AUTH_ERROR) {
      // return refreshToken(reqFun, refreshFn, logoutFn);
    } else {
      return res;
    }
  },

  async get(url: string, headers?: any) {
    const reqFun = () => {
      return fetch(url, {
        headers: {
          // Authorization: "Bearer " + store.state.user.token,
          ...headers,
        },
      });
    };

    const response = await reqFun();
    const res = await response.json();

    if (res.code === CODE.AUTH_ERROR) {
      // return refreshToken(reqFun, refreshFn, logoutFn);
    } else {
      return res;
    }
  },
};

export { myFetch };
