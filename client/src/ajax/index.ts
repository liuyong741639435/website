import axios from "axios";
import { getToken } from "../utils/token";
import config from "../config";
import cancelToken from "./cancelToken";
import router from "../router";

const request = axios.create({
  baseURL: config.baseURL,
  timeout: config.timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

function createdUrl(config: any) {
  return [
    config.method,
    config.url,
    // 如果还需要其他参数，后续再视情况
  ].join("&");
}

// 请求拦截器
request.interceptors.request.use((config) => {
  // 统一处理的一些内容
  // 1 token
  const token = getToken();
  if (token) {
    // 如果调用api时，有在头部设置其他数据，以调用api时传入的为准
    config.headers.Authorization = config.headers.Authorization ?? token;
  }
  // end
  // 2 关于请求重复的处理  取消令牌
  const key = createdUrl(config);
  config.cancelToken = cancelToken.set(key);
  // end
  return config;
});

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 取消令牌
    const key = createdUrl(response.config);
    cancelToken.cancel(key);
    // end
    return response.data; // 后端返回的数据
  },
  (error) => {
    // 当http状态码 不是 200-300 就会走这里
    switch (error.response?.status) {
      case 401:
        router.push("/user/account/login");
        // 响应的操作，如跳转到登录页面
        break;
      case 403:
        router.push("/user/account/login");
        // 重新登录，或者重新获取token
        break;
      default:
        return Promise.reject("未知错误");
    }
  }
);

export default request;
