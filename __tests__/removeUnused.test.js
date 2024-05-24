const generate= require('@babel/generator').default;
const removeUnused = require('../src/transformer.js');
const {parseCodeToAST, identifyUnused} = require('../src/parser.js');

it('should remove unused variables', () => {
    const sourceCode = `let unusedVar = 10; function printTips(){ return; } console.log('Hello');`;
    const expectedCode = `console.log('Hello');`;
    
    const ast = parseCodeToAST(sourceCode);
    const {unusedVariables, unusedFunctions} = identifyUnused(ast);
    removeUnused(ast, unusedVariables, unusedFunctions);

    const resultCode = generate(ast).code;
    expect(resultCode).toBe(expectedCode);
});
