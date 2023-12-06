/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  semi: false,
  singleQuote: false,
  useTabs: false,
  tabWidth: 2,
  printWidth: 120,
  jsxSingleQuote: false,
  trailingComma: "all",
  arrowParens: "avoid",
  proseWrap: "always",
  overrides: [
    {
      files: "**/*.md",
      options: {
        printWidth: 80,
      },
    },
  ],
};

export default config;
