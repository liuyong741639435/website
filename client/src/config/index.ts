import { Config } from "./type";

// 环境相关和服务器相关配置在这里写
enum env {
  dev,
  uat,
  prd,
}

let curr: env;
curr = env.dev; // 这一步按到底是要有前置，去区分的，现在只是写死。 todo

const devConfig: Config = {
  timeout: 5000,
  baseURL: "/api",
  uploadURL: "http://127.0.0.1",
};

// const uatConfig: Config = {
//   timeout: 5000,
//   baseURL: "www.baidu.com",
// };

// const prdConfig: Config = {
//   timeout: 5000,
//   baseURL: "www.baidu.com",
// };

let config: Config;

switch (curr) {
  case env.dev:
    config = devConfig;
  // case env.uat:
  //   config = uatConfig;
  // case env.prd:
  //   config = prdConfig;
}

// 后面有需要不同情况的，再做判断输出
export default config;
