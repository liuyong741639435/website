import axios, { Canceler } from "axios";
let cancel: Record<string, Canceler | null> = {}; //  非请求唯一性的令牌存放

export default {
  // 设置令牌
  set(key: string) {
    cancel[key]?.(); //取消之前请求
    return new axios.CancelToken((c: Canceler) => (cancel[key] = c));
  },
  // 清空令牌缓存
  cancel(key: string) {
    cancel[key] = null;
  },
  // 取消所有的请求以及缓存的令牌 推荐注册在 路由拦截。这样可以离开某个路由，直接终止无异议的请求
  cancelAll() {
    Object.keys(cancel).forEach((key) => {
      cancel[key]?.(); // 调用取消
      cancel[key] = null; // 重置
    });
    cancel = {};
  },
};
