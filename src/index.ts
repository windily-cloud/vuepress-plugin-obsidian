import stringReplace from "./markdown-it-plugins/stringReplace";
import { wikilink } from "./markdown-it-plugins/wikiLink";

const obsidianPlugin = (options?: any) => {
  return {
    name: 'vuepress-plugin-obsidian',
    extendsMarkdown: (md) => {
      md.use(stringReplace)
        .use(wikilink)
    },
  }
}

export default obsidianPlugin
