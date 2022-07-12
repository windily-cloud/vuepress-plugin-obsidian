import stringReplace from "./markdown-it-plugins/stringReplace";

const obsidianPlugin = (options?: any) => {
  return {
    name: 'vuepress-plugin-obsidian',
    extendsMarkdown: (md) => {
      md.use(stringReplace)
    },
  }
}

export default obsidianPlugin