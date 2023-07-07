// 统一管理token的存储方式

export function setToken(token: string) {
  window.localStorage.setItem("Authorization", token);
}

export function getToken(): string | null {
  return window.localStorage.getItem("Authorization");
}
