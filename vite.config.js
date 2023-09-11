import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import viteImagemin from "vite-plugin-imagemin"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7, // 设置GIF图片的优化等级为7
        interlaced: false // 不启用交错扫描
      },
      optipng: {
        optimizationLevel: 7 // 设置PNG图片的优化等级为7
      },
      mozjpeg: {
        quality: 20 // 设置JPEG图片的质量为20
      },
      pngquant: {
        quality: [0.8, 0.9], // 设置PNG图片的质量范围为0.8到0.9之间
        speed: 4 // 设置PNG图片的优化速度为4
      },
      svgo: {
        plugins: [
          {
            name: "removeViewBox" // 启用移除SVG视图框的插件
          },
          {
            name: "removeEmptyAttrs",
            active: false // 不启用移除空属性的插件
          }
        ]
      }
    })
  ],
  base: "./",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  envDir: "env",
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/index.scss";`
      }
    }
  },
  server: {
    host: "0.0.0.0"
  }
})
