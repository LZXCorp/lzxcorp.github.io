import {visit} from 'unist-util-visit';

/**
 * Rehype plugin to lazy-load images/iframes and set sane defaults
 * - Adds loading="lazy" to <img> and <iframe> when not explicitly set
 * - Adds decoding="async" and fetchpriority="low" to images
 */
export default function rehypeLazyMedia() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img') {
        node.properties = node.properties || {};
        if (!('loading' in node.properties)) node.properties.loading = 'lazy';
        if (!('decoding' in node.properties)) node.properties.decoding = 'async';
        if (!('fetchpriority' in node.properties)) node.properties.fetchpriority = 'low';
        // Ensure width/height to reduce CLS if available via attributes
      }
      if (node.tagName === 'iframe') {
        node.properties = node.properties || {};
        if (!('loading' in node.properties)) node.properties.loading = 'lazy';
      }
    });
  };
}
