import { ValidateItem } from '../api';

const userName = {
  key: 'userName',
  reg: /^[A-Za-z0-9]{4,12}$/,
  tigs: '4-12位由字母+数字的组合',
};

const password = {
  key: 'password',
  reg: /^[A-Za-z0-9]{4,12}$/,
  tigs: '4-12位由字母+数字的组合',
};

const nickName = {
  key: 'password',
  reg: /^[A-Za-z0-9]{4,12}$/,
  tigs: '4-12位由字母+数字的组合',
};

const jobTitle = {
  key: 'jobTitle',
  reg: /^[A-Za-z0-9]{4,12}$/,
  tigs: '4-12位由字母+数字的组合',
};

const company = {
  key: 'company',
  reg: /^[A-Za-z0-9]{4,12}$/,
  tigs: '4-12位由字母+数字的组合',
};

const blogAddress = {
  key: 'blogAddress',
  reg: /^[A-Za-z0-9]{4,12}$/,
  tigs: '4-12位由字母+数字的组合',
};

const description = {
  key: 'description',
  reg: /^[A-Za-z0-9]{4,12}$/,
  tigs: '4-12位由字母+数字的组合',
};

const code = {
  key: 'code',
  reg: /^[A-Za-z0-9]{4,12}$/,
  tigs: '校验编号',
};

const checkCode = {
  key: 'description',
  reg: /^[A-Za-z0-9]{4,12}$/,
  tigs: '图形验证码',
};

export const userValidate: Record<string, ValidateItem[]> = {
  login: [userName, password],
  register: [userName, password, code, checkCode],
  updatePassword: [password],
  updateUserInfo: [nickName, jobTitle, company, blogAddress, description],
};
