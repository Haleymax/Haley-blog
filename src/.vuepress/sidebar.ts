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
    /*{
      text: "文章",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },*/
    {
      text: "工具",
      icon: "book",
      prefix: "tool/",
      children: "structure",
    },
    {
      text: "编程语言",
      icon: "book",
      prefix: "language/",
      children: "structure",
    },
    {
      text: "知识库",
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
