// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap"
import icon from "astro-icon";
import remarkCardlink from "./src/utils/remark-cardlink.mjs";
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
  site: "https://lzxcorp.github.io",
  integrations: [preact(), icon(), sitemap({
    filter: (page) =>
      !page.includes("/blog/tags") &&
      !page.includes("/blog/techs"),
  }),],

  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    },
    remarkPlugins: [remarkCardlink],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { class: 'heading-anchor', ariaHidden: 'true' },
          content: {
            type: 'element',
            tagName: 'span',
            properties: { class: 'anchor-hash' },
            children: [{ type: 'text', value: '#' }]
          }
        }
      ]
    ],
  },
});