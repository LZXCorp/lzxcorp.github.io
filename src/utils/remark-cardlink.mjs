// Remark plugin to transform ```cardlink fenced YAML blocks into card-styled HTML blocks
// Syntax example:
// ```cardlink
// url: https://obsidian.md/
// title: "Obsidian"
// description: "Obsidian: A knowledge base that works on local Markdown files."
// host: obsidian.md
// favicon: https://obsidian.md/favicon.ico
// image: https://obsidian.md/images/banner.png
// ```

import { visit } from "unist-util-visit";
import YAML from "yaml";

/**
 * @typedef {import('mdast').Root} Root
 */

/**
 * Normalize potential Obsidian-style internal link strings like [[image.png]]
 * to a plain path string without brackets.
 * @param {string | undefined} val
 */
function normalizeObsidianLink(val) {
  if (!val || typeof val !== "string") return val;
  const trimmed = val.trim();
  if (trimmed.startsWith("[[") && trimmed.endsWith("]]")) {
    return trimmed.slice(2, -2).trim();
  }
  return val;
}

/**
 * Extract host from URL string.
 * @param {string} url
 */
function getHost(url) {
  try {
    return new URL(url).host;
  } catch {
    return "";
  }
}

/**
 * Build a safe string for HTML attributes.
 * @param {string} s
 */
function escAttr(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Build a safe string for HTML content.
 * @param {string} s
 */
function escText(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Remark plugin
 * @returns {(tree: Root) => void}
 */
export default function remarkCardlink() {
  return (tree) => {
    visit(tree, "code", (node, index, parent) => {
      if (!parent || node.lang !== "cardlink") return;

      // Parse YAML from the code block
      /** @type {{url?: string, title?: string, description?: string, host?: string, favicon?: string, image?: string}} */
      let data = {};
      try {
        data = YAML.parse(node.value || "") || {};
      } catch (e) {
        // If YAML fails to parse, leave node unchanged
        return;
      }

      const url = (data.url || "").trim();
      if (!url) return; // require url at minimum

      const title = (data.title || url).toString();
      const description = (data.description || "").toString();
      const host = (data.host || getHost(url)).toString();
      const image = normalizeObsidianLink(data.image || "");
      let favicon = normalizeObsidianLink(data.favicon || "");
      if (!favicon && host) {
        favicon = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=64`;
      }

      // Build HTML output using BEM-like classes so CSS can target reliably.
      // Note: do not rely on Tailwind utility classes in runtime-generated HTML.
      const imgHtml = image
        ? `<div class="cardlink__thumb" style="background-image:url('${escAttr(image)}');"></div>`
        : "";

      const faviconHtml = favicon
        ? `<img class="cardlink__favicon" src="${escAttr(favicon)}" alt="${escAttr(host || "favicon")}" loading="lazy" decoding="async"/>`
        : "";

      const metaHtml =
        host || favicon
          ? `<div class="cardlink__meta">${faviconHtml}${host ? `<span class="cardlink__host">${escText(host)}</span>` : ""}</div>`
          : "";

      const descHtml = description
        ? `<p class="cardlink__desc">${escText(description)}</p>`
        : "";

      const html = `
<div class="cardlink no-toc" data-no-toc>
  <a class="cardlink__inner" href="${escAttr(url)}" target="_blank" rel="noopener noreferrer nofollow">
    ${imgHtml}
    <div class="cardlink__content">
  <div class="cardlink__title" role="heading" aria-level="5" aria-hidden="true" data-no-toc>${escText(title)}</div>
      ${descHtml}
      ${metaHtml}
    </div>
  </a>
</div>`;

      parent.children.splice(index, 1, {
        type: "html",
        value: html,
      });
    });
  };
}
