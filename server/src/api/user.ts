// 可以修改的参数
export interface Profile {
  password: string;
  nickName: string;
  jobTitle: string;
  company: string;
  blogAddress: string;
  description: string;
}
// 接口入参
export interface Login {
  userName: string;
  password: string;
}

export interface Register {
  userName: string;
  password: string;
  code: string;
  checkCode: string;
}

export interface updatePassword {
  password: string;
}

export interface updateUserInfo {
  nickName: string;
  jobTitle: string;
  company: string;
  blogAddress: string;
  description: string;
}

export interface UserInfo {
  userId?: number;
}
