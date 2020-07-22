export function create(Cls, attributes, ...children){

    let o;

    if(typeof Cls === "string"){
        o = new Wrapper(Cls);
    } else {
        o = new Cls({
            timer: {}
        });
    }

    for(let name in attributes){
        o.setAttribute(name, attributes[name])
    }
        
    for(let child of children){
        if(typeof child === "string"){
            child = new Text(child);
        }
        o.appendChild(child)
    }
    return o;
}

export class Text{
    constructor(text){
        this.children = [];
        this.root = document.createTextNode(text);
    }
    mountTo(parent){
        parent.appendChild(this.root);
    }
}

export class Wrapper{
    constructor(type){
        this.children = [];
        this.root = document.createElement(type);
    }

    setAttribute(name, value){
        this.root.setAttribute(name, value);
    }

    appendChild(child){
        // this.root.appendChild(child);
        this.children.push(child);
    }

    mountTo(parent){
        parent.appendChild(this.root);
        for(let child of this.children){
            child.mountTo(this.root);
        }
    }
}