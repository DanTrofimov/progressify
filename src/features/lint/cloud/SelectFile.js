const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch-commonjs');

const parser = require('@babel/parser');
const generate = require("@babel/generator").default;

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

const API_KEY = 'Api-Key';
const CLOUD_FUNC_ENDPOINT = 'https://functions.yandexcloud.net/d4e5igjblkjsmcp0u277';   

const response = fetch(CLOUD_FUNC_ENDPOINT, {
    method: 'POST', 
    body: astJson,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': API_KEY,
    },
    isBase64Encoded: false
}).then((response) => response.json())
    .then((data) => {   
    console.log(data);
});
