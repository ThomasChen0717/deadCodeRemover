import generateCodeFromAST from './generator.js';
import {parseCodeToAST, identifyUnused} from './parser.js';
import removeUnused from './transformer.js';


function processScriptTag(scriptTag){
    const originalCode = scriptTag.textContent;
    const ast = parseCodeToAST(originalCode);
    const {unusedVariables, unusedFunctions} = identifyUnused(ast);
    if(unusedVariables.size > 0 || unusedFunctions.size > 0){
        removeUnused(ast, unusedVariables, unusedFunctions);
        const optimizedCode = generateCodeFromAST(ast);
        const newScriptTag = document.createElement('script');
        newScriptTag.textContent = optimizedCode;
        if (scriptTag.type) {
            newScriptTag.type = scriptTag.type;
        }
        // Replace the old script tag with the new one in the DOM
        scriptTag.parentNode.replaceChild(newScriptTag, scriptTag);
    }
};


function init(){
    const scriptTag = document.querySelectorAll('script');
    const inlineScriptTags = Array.from(scriptTag).filter(script => 
        !script.src && (!script.type || script.type.toLowerCase() === "text/javascript" || script.type.toLowerCase() === "application/javascript")
    );

    // Process each inline script tag
    inlineScriptTags.forEach(processScriptTag);
};


document.addEventListener('DOMContentLoaded', () => {
    // This code runs after the DOM is fully loaded, but before other resources like images and stylesheets are fully loaded.
    init();
});