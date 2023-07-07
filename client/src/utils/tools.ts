// 节流，立刻触发，在一定时间内不再触发
export function throttle(cb: Function, delay = 500) {
  let prev = 0;
  return function () {
    const newDate = Date.now();
    if (newDate >= prev + delay) {
      cb.apply(this, arguments);
      prev = newDate;
    }
  };
}

// 防抖，延迟触发，间隔时间内触发，重置间隔时间，间隔时间内没有额外触发，才会调用cb。
export function debounce(cb: Function, delay = 500) {
  let timer: number | null = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      cb.apply(this, arguments);
      timer = null;
    }, delay);
  };
}
