import { create } from 'svg-captcha';
import { randomStr } from './tool';

const baseMap = new Map();
const delay = 100000; // 100S
const interval = 1000; // 1S

export function getBase64() {
  const baseData = create();
  const code = randomStr();
  const expTime = new Date().getTime() + delay; // 到期时间
  baseMap.set(code, {
    code: baseData.text,
    expTime,
  });
  return {
    data: baseData.data,
    code,
    expTime,
  };
}

export function checkBase64(data: { checkCode: string; code: string }) {
  const baseMapItem = baseMap.get(data.code)?.code.toUpperCase();
  if (baseMapItem) {
    return baseMapItem === data.checkCode?.toUpperCase()
      ? {
          code: 0,
          msg: '校验成功',
        }
      : {
          code: -1,
          msg: '校验失败',
        };
  } else {
    return {
      code: -1,
      msg: '验证码超时',
    };
  }
}
// todo 现在是每interval（1s）遍历一次， 后面可以尝试每次调用getBase64，提供添加一个定时器
(function () {
  setInterval(() => {
    const time = new Date().getTime();
    baseMap.forEach(key => {
      if (time < baseMap.get(key)?.expTime) {
        baseMap.delete(key);
      }
    });
  }, interval);
})();
