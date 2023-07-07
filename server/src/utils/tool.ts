// 去除 undefined
export function removeUndefined(data: Record<string, any>) {
  const res = { ...data };
  Object.keys(data).forEach(key => {
    if (data[key] === undefined) {
      delete res[key];
    }
  });
  return res;
}

export function randomNum(minNum: number, maxNum: number) {
  return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
}

export function randomStr(length = 10) {
  return String(Math.floor(10 ** length * Math.random()));
}
