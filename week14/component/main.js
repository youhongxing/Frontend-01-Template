function create(Cls, attributes, ...children){

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

class Text{
    constructor(text){
        this.children = [];
        this.root = document.createTextNode(text);
    }
    mountTo(parent){
        parent.appendChild(this.root);
    }
}

class Wrapper{
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

class MyComponent {
    constructor(config){
        this.children = [];
        
    }

    setAttribute(name, value){
        this.root.setAttribute(name, value);
    }

    appendChild(child){
        // this.root.appendChild(child);
        this.children.push(child);
        // this.slot.appendChild(child);
    }

    render(){
       
        return <article>
            <header>this is header</header>
            {this.slot}
            <footer>this is footer</footer>
        </article>
    }

    mountTo(parent){
        // parent.appendChild(this.root);
        
        this.slot = <div></div>;
        for(let child of this.children){
            this.slot.appendChild(child);
        }
        this.render().mountTo(parent);
    }

}

let component = <MyComponent>
    <div>text content</div>
</MyComponent>

component.mountTo(document.body);

// component.setAttribute("id", "a"); 