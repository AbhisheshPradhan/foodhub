/** @type {import('prettier').Config} */
module.exports = {
    plugins: ["prettier-plugin-tailwindcss"],

    parser: "typescript",

    semi: true,
    trailingComma: "all",
    singleQuote: false,
    printWidth: 80,
    tabWidth: 4,
};
