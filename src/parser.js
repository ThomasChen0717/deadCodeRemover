const parser= require('@babel/parser');
const traverse = require('@babel/traverse').default;

function parseCodeToAST(code){
    return parser.parse(code, {sourceType: 'unambiguous'});
};

function identifyUnused(ast){
    const usedCode = new Set();
    const declaredVariables = new Map();
    const declaredFunctions = new Map();

    traverse(ast, {
        VariableDeclarator: function(path) {
            if(path.node.id){
                declaredVariables.set(path.node.id.name, path);
            }
        },
        FunctionDeclaration: function(path) {
            if(path.node.id){
                declaredFunctions.set(path.node.id.name, path);
            }
        },
        Identifier: function(path){
            if(path.isReferencedIdentifier()){
                usedCode.add(path.node.name);
            }
        }
    });

    const unusedVariables = new Set([...declaredVariables.keys()].filter(x => !usedCode.has(x)));
    const unusedFunctions = new Set([...declaredFunctions.keys()].filter(x => !usedCode.has(x)));

    unusedVariables.forEach(variable => {
        const path = declaredVariables.get(variable);
        console.log("Variable Name: ", variable, path.node.start, path.node.end);
    });
    unusedFunctions.forEach(func => {
        const path = declaredFunctions.get(func);
        console.log("Function Name: ", func, path.node.start, path.node.end);
    });


    return {unusedVariables, unusedFunctions};
}

module.exports = {parseCodeToAST, identifyUnused};
