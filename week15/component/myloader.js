const parser = require("./parser.js");

module.exports = function (source) {
    let tree = parser.parseHTML(source);
    let template = null;
    let script = null;

    for (let node of tree.children) {
        if (node.tagName == "template")  {
            template = node.children.filter(e => e.type != 'text')[0];
        }
        if (node.tagName == "script") {
            script = node.children[0].content;
        }
    }

    let visit = (node) => {
        let attrs = {};
        if (node.type === 'text') {
            return JSON.stringify(node.content);
        }

        for (let attribute of node.attributes) {
            attrs[attribute.name] = attribute.value;
        }
        let children = node.children.map(node => visit(node));

        return `create("${node.tagName}", ${JSON.stringify(attrs)}, ${children})`
    } 

    visit(template);

    let result = `import {create, Text, Wrapper} from "./createElement";
        export class Carousel {
            render() {
                return ${visit(template)};
            }
            mountTo(parent) {
                this.render().mountTo(parent);
            }
            setAttribute(name, value) {
                this[name] = value;
            }
        }`;
    return result;
}