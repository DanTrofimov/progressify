const { ESLint } = require("eslint");
const path = require('path');
const fs = require('fs');

const testCode = `
  const name = "eslint";
  if(true) {
    console.log("constant condition warning")
  };
`;

(async function main() {
    // 1. Create an instance
    const eslint = new ESLint({
        useEslintrc: false,
        overrideConfig: {
            extends: ["eslint:recommended"],
            parserOptions: {
                sourceType: "module",
                ecmaVersion: "latest",
            },
            env: {
                es2022: true,
                node: true,
            },
        },
    });

    // 2. Lint text.
    const results = await eslint.lintText(testCode);

    // 3. Format the results.
    const formatter = await eslint.loadFormatter("stylish");
    const resultText = formatter.format(results);

    // 4. Output it.
    console.log(resultText);
})().catch((error) => {
    process.exitCode = 1;
    console.error(error);
});