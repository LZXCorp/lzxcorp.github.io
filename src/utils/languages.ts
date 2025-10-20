export interface Language {
  name: string;
  iconName: string;
  className?: string;
}

export const languages: Record<string, Language> = {
  cloudflare: {
    name: "Cloudflare",
    iconName: "cloudflare",
  },
  html: {
    name: "HTML 5",
    iconName: "html",
  },
  javascript: {
    name: "JavaScript",
    iconName: "javascript",
  },
  node: {
    name: "Node.js",
    iconName: "node",
  },
  tailwind: {
    name: "Tailwind CSS",
    iconName: "tailwind",
  },
  firebase: {
    name: "Firebase",
    iconName: "firebase",
  },
  markdown: {
    name: "Markdown",
    iconName: "markdown",
  },
  php: {
    name: "PHP",
    iconName: "php",
  },
  sass: {
    name: "Sass",
    iconName: "sass",
  },
  ts: {
    name: "TypeScript",
    iconName: "typescript",
  },
  git: {
    name: "Git",
    iconName: "git",
  },
  css: {
    name: "CSS",
    iconName: "css",
  },
  aws: {
    name: "AWS",
    iconName: "aws",
  },
  vercel: {
    name: "Vercel",
    iconName: "vercel",
  },
  netlify: {
    name: "Netlify",
    iconName: "netlify",
  },
  gatsby: {
    name: "Gatsby",
    iconName: "gatsby",
  },
  docker: {
    name: "Docker",
    iconName: "docker",
  },
  python: {
    name: "Python",
    iconName: "python",
  },
  cisco: {
    name: "Cisco",
    iconName: "cisco",
  },
  wazuh: {
    name: "Wazuh",
    iconName: "wazuh",
  },
  ad: {
    name: "Active Directory",
    iconName: "ad",
  },
  golang: {
    name: "Go",
    iconName: "golang",
  },
  sql: {
    name: "SQL",
    iconName: "sql"
  },
  c: {
    name: "C",
    iconName: "c",
  },
  csharp: {
    name: "C#",
    iconName: "csharp",
  },
};

export const getLanguage = (lang: string): Language => {
  return languages[lang] || languages.html;
}; 