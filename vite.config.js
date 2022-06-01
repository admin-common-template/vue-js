import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
import WindiCSS from 'vite-plugin-windicss'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
  plugins: [
    vue(),
    viteMockServe({
      supportTs: false,
    }),
    legacy({
      targets: ['defaults', 'IE 11'], // 兼容IE11
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router'],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    WindiCSS(),
    viteCompression({
      threshold: 5120, // 大于5k文件压缩
      ext: '.gz',
      deleteOriginFile: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@api': resolve(__dirname, 'src/handles/api'),
      '@store': resolve(__dirname, 'src/store'),
      '@column': resolve(__dirname, 'src/handles/column'),
      '@validate': resolve(__dirname, 'src/handles/validate'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "./src/assets/css/style.scss" as *;',
      },
    },
  },
})
