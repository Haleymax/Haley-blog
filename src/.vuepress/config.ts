import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "个人站点",
  description: "Personal Sites",
  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
