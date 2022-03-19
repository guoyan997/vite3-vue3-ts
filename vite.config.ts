/*
 * @Description: 工作使我快乐，我爱生活，更爱工作！
 * @Version: 1.0
 * @Autor: GY
 * @Date: 2022-02-14 15:59:45
 * @LastEditors: GY
 * @LastEditTime: 2022-03-11 16:56:59
 */
/*
 * :Date: 2022-02-14 15:59:45
 * :LastEditTime: 2022-02-21 11:16:10
 * :Description: created by GY
 * :LastEditors: gy
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/assets/style/element/index.scss" as *;@import "./src/assets/style/varieties.scss";@import "./src/assets/style/rem.scss";'
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    // 自定义目标也可以是一个 ES 版本（例如：es2015）、一个浏览器版本（例如：chrome58）或是多个目标组成的一个数组。
    target: 'es2015',
    outDir: 'dist', // 打包目录,注意使用的是history模式，打包后的目录名要和history里配置的一致
    assetsDir: 'static', // 打包目录下的静态资源目录， 默认值是assets
    terserOptions: {
      compress: {
        keep_infinity: true,
        // 生产环境关闭日志, true 是关闭，false是不关闭
        drop_console: false,
        // 生产环境，关闭debugger
        drop_debugger: true
      }
    },
    // 压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
    brotliSize: false,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
