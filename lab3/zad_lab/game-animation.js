class GameAnimation extends HTMLElement {



    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
        this.images = [
            "neko/bieg1.gif",
            "neko/bieg2.gif",
            "neko/zatrzymanie.gif",
            "neko/ziewanie.gif",
            "neko/drapanie1.gif ",
            "neko/drapanie2.gif",
            "neko/spanie1.gif",
            "neko/spanie2.gif",
            "neko/pobudka.gif"
        ];

    }

    setInterv() {
        this.intervalID = setInterval(() => {
            this.current = this.current + 1;
            //console.log(this.timeout);
        }, parseInt(this.timeout));
    }



    get current() {
        return this.getAttribute('current');
    }

    set current(currentPhoto) {
        return this.setAttribute('current', currentPhoto % this.images.length);
    }

    get points() {
        return this.getAttribute('points');
    }

    set points(pointsNumber) {
        return this.setAttribute('points', pointsNumber);
    }

    get timeout() {
        return this.getAttribute('timeout');
    }

    set timeout(timeoutValue) {
        return this.setAttribute('timeout', timeoutValue);
    }

    static get observedAttributes() {
        return ['current'];
    }

    attributeChangedCallback(prop, oldVal, newVal) {
        if (prop === 'current') this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.root.innerHTML = `
            <style>
                #wrapper {
                    padding: 10px;
                    margin: 30px;
                    border: 1px black solid;
                    width: 150px;
                    height: 200px;
                }
                img {
                    width: 100px;
                    height: 100px;
                    border: 1px solid black;
                    margin: 25px;
                }

            </style>
            <div id="wrapper">
            <span>Punkty: ${this.points} </span><br>
            <span>Timeout: ${this.timeout} </span><br>
            <span>Current: ${this.current} </span><br>

                <img src="${this.images[this.current]}" alt="bieg1">

            </div>
        `;

        this.root.querySelector('img').addEventListener('click', () => {
            console.log("click inside");
            this.points = 10;
        });
    }

}


customElements.define('game-animation', GameAnimation);