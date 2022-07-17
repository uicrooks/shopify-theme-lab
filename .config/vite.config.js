import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import del from "rollup-plugin-delete";
import ESLintPlugin from '@modyqyw/vite-plugin-eslint';
import StylelintPlugin from 'vite-plugin-stylelint';

export default {
  plugins: [
    vue(),
    ESLintPlugin({
      overrideConfigFile: resolve(__dirname, "./.eslintrc.js"),
      include: "../src/**/*.{js,vue}",
    }),
    StylelintPlugin({
      files: '../src/**/*.{vue,css,sass,scss}',
      configFile: resolve(__dirname, './.stylelintrc.js')
    })
  ],
  clearScreen: false,
  css: {
    postcss: resolve(__dirname, "../.config/postcss.config.js"),
  },
  resolve: {
    extensions: ["*", ".js", ".vue", ".json"],
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
      "@": resolve(__dirname, "../src/"),
      "@shopify-directory": resolve(__dirname, "../shopify/"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        bundle: resolve(__dirname, "../src/main.js"),
      },
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: (assetInfo) =>
          assetInfo.name.split("/").pop().split(".").shift() == "main"
            ? "bundle.css"
            : "[name].[ext]",
      },
      plugins: [
        process.env.NODE_ENV == "production" &&
          del({
            targets: ["../shopify/assets/**/*", "!../shopify/assets/*static*"],
          }),
      ],
    },
    outDir: resolve(__dirname, "../shopify/assets"),
    assetsDir: ".",
    emptyOutDir: false,
  },
};
