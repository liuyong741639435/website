import request from "../ajax/index";
// 获取图形验证码
export const apiBaseCode = () =>
  request.get<any, API.Response<USER.BaseCodeRes>>("/user/baseCode");
// 注册
export const apiRegoster = (data: USER.Register) =>
  request.post<any, API.Response<USER.RegisterRes>>(
    "/user/register",
    JSON.stringify(data)
  );
// 登录
export const apiLogin = (data: USER.Login) =>
  request.post<any, API.Response<USER.LoginRes>>(
    "/user/login",
    JSON.stringify(data)
  );
