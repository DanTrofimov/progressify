const fs = require('fs');

const parser = require('@babel/parser');
const generate = require("@babel/generator").default;

const path = require('path');
const fileDir = path.join(__dirname, '../plugin/example');
const filePath = path.join(fileDir, 'sw.js');
const outputFilePath = path.join(fileDir, 'ast.json');
const codegenFilePath = path.join(fileDir, 'parsed.js');

const code = fs.readFileSync(filePath).toString();

// selected file's AST
const ast = parser.parse(code, {
    ecmaVersion: 14
});

// generated ast.json
const astJson = JSON.stringify(ast);
fs.writeFileSync(outputFilePath, astJson);

const generatedFile = generate(ast);

// result of generation from ast
fs.writeFileSync(codegenFilePath, generatedFile.code.toString());
