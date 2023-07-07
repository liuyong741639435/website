declare namespace USER {
  // 图形验证码
  // 返回格式
  interface BaseCodeRes {
    data: string;
    code: string;
    expTime: number;
  }
  // 注册
  // 请求格式
  interface Register {
    userName: string;
    password: string;
    code: string;
    checkCode: string;
  }
  // 返回格式
  interface RegisterRes {}

  // 登录
  // 请求格式
  interface Login {
    userName: string;
    password: string;
  }
  // 返回格式
  interface LoginRes {}
}
