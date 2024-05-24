const generate = require('@babel/generator').default;

function generateCodeFromAST(ast) {
    const {code} = generate(ast, {});
    return code;
};

module.exports = generateCodeFromAST;