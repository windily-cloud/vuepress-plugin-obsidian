# vuepress-plugin-obsidian

A vuepress plugin that extends the obsidian syntax to enable direct static site generation from obsidian files.

# roadmap

- coming soon
  - [ ] resolve wikilinks to markdown links
  - [ ] resolve image link
  - [ ] support admonition plugin simple syntax
  - [ ] support echart/chart code block
- further
  - [ ] more detail optimization
  - [ ] force graph like obsidian graph view

# contribute

1. Generate vuepress project by using [vuepress theme hope](https://vuepress-theme-hope.github.io/v2/guide/)
2. Fork this plugin into your project at `.vuepress`
3. At `.vuepress/config.ts`, You need to register the plugin, as below
4. `npm run docs:dev`

![](./assets/register-plugin.png)