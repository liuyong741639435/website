// 示例
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => {
    return { count: 0 };
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});

/**
    组件中使用方式
    import useCounterStore from '@/store/xxx'
    const counter = useCounterStore()
    counter.count++
    // 带自动补全 ✨
    counter.$patch({ count: counter.count + 1 })
    // 或使用 action 代替
    counter.increment()
 */
