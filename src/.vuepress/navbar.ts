import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/demo/",
  {
    text: "知识库",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "网络编程",
        icon: "pen-to-square",
        prefix: "apple/",
        children: [
          { text: "大小端转换", icon: "pen-to-square", link: "1" },
          { text: "套接字", icon: "pen-to-square", link: "2" },
          //"3",
          //"4",
        ],
      },
      {
        text: "算法",
        icon: "pen-to-square",
        prefix: "banana/",
        children: [
          {
            text: "动态规划",
            icon: "pen-to-square",
            link: "1",
          },
          {
            text: "leetcode",
            icon: "pen-to-square",
            link: "2",
          },
          //"3",
          //"4",
        ],
      },
      /*{ text: "樱桃", icon: "pen-to-square", link: "cherry" },
      { text: "火龙果", icon: "pen-to-square", link: "dragonfruit" },
      "tomato",
      "strawberry",*/
    ],
  },
  {
    text: "模块1",
    icon: "book",
    link: "",
  },
]);
