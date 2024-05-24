const traverse = require('@babel/traverse').default;

function removeUnused(ast, unusedVariables, unusedFunctions){
    traverse(ast, {
        VariableDeclarator: function(path) {
            if (unusedVariables.has(path.node.id.name)) {
                // If the variable is alone in its declaration, remove the entire declaration
                if (path.parent.declarations.length === 1) {
                    path.parentPath.remove();
                } else {
                    // Otherwise, just remove the specific declarator
                    path.remove();
                }
            }
        },
        FunctionDeclaration: function(path) {
            if (unusedFunctions.has(path.node.id.name)) {
                path.remove();
            }
        }
    });
};

module.exports = removeUnused;
