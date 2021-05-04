class Animation extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.span = document.createElement('span');
        this.points = 0;
        this.delay = 1000;
        this.img = ""
    }

    set images(imageArray) {
        this.images = imageArray;
    }

    get images() {
        return this.imageArray;
    }

    get current() {
        return this.current;
    }

    set current(x) {
        this.current = this.current;
    }

    get points() {
        return this.points;
    }

    set points(x) {
        this.points = this.points;
    }

    static get observedAttributes() {
        return [img, points, delay];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // called when one of attributes listed above is modified
    }

}