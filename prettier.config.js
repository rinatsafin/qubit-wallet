module.exports = {
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.js',
  tabWidth: 2,
  useTabs: false,
  semi: true,
  trailingComma: "all",
  jsxSingleQuote: true,
  singleQuote: true,
  printWidth: 100,
  arrowParens: "always",
  endOfLine: "auto"
}