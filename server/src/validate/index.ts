import { API } from '../api';

export function validate(data: Record<string, any>, tips: API.ValidateItem[]) {
  return tips
    .filter(item => {
      const value = data[item.key];
      // 默认为必填项
      const required = item.required ?? true;
      // 非必填，传入undefined 就不做记录了
      if (required === false && value === undefined) return false;
      if (item.reg) {
        return !item.reg.test(data[item.key]);
      } else if (item.values) {
        return item.values.includes(value);
      }
    })
    .map(item => ({ key: item.key, tigs: item.tigs }));
}
