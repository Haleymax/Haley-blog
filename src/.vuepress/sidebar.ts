import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
/*    {
      text: "如何使用",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },*/
    {
      text: "自动化测试项目",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    {
      text: "golang项目",
      icon: "book",
      prefix: "tool/",
      children: "structure",
    },
    {
      text: "python项目",
      icon: "book",
      prefix: "language/",
      children: "structure",
    },
    {
      text: "工具开发",
      icon: "book",
      prefix: "knowledge/",
      children: "structure",
    },
    "intro",
    {
      text: "幻灯片",
      icon: "person-chalkboard",
      link: "",
    },
  ],
});
