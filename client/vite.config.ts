import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteCompression from "vite-plugin-compression";
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteCompression({
      verbose: true, // 默认即可
      disable: false, //开启压缩(不禁用)，默认即可
      deleteOriginFile: false, //删除源文件
      threshold: 10240, //压缩前最小文件大小
      algorithm: "gzip", //压缩算法
      ext: ".gz", //文件类型
    }),
    viteMockServe({
      mockPath: "./src/mock/", // 指向mock下的文件
      localEnabled: true // 是否开启开发环境
    }),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: "/src",
      },
      { find: "views", replacement: "/src/views" },
      { find: "components", replacement: "/src/components" },
      { find: "api", replacement: "/src/api" },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `
          @import "@/styles/variables.less";
          @import "@/styles/mixins.less";
        `,
      },
    },
  },
  base: "/", // 设置打包路径 ./
  server: {
    port: 4000, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域

    // 设置代理，根据我们项目实际情况配置
    proxy: {
      "/api": {
        target: "http://127.0.0.1:80",
        changeOrigin: true,
      },
      "/upload": {
        target: "http://127.0.0.1:80",
        changeOrigin: true,
      },
    },
  },
});
