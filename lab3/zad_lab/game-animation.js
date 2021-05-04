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
        this.n = Math.random() * 4 + 2;

    }

    setInterv() {
        this.intervalID = setInterval(() => {
            let newCurrentVal = 0;
            switch (parseInt(this.current)) {
                case 0:
                    this.n--;
                    newCurrentVal = 1;
                    break;
                case 1:
                    if (this.n > 0) newCurrentVal = 0;
                    else newCurrentVal = 2;
                    break;
                case 2:
                    this.n = Math.random() * 4 + 2;
                    newCurrentVal = 3;
                    break;
                case 3:
                    newCurrentVal = 4;
                    break;
                case 4:
                    this.n--;
                    newCurrentVal = 5;
                    break;
                case 5:
                    if (this.n > 0) newCurrentVal = 4;
                    else {
                        this.n = Math.random() * 4 + 2;
                        newCurrentVal = 6;
                    }
                    break;
                case 6:
                    this.n--;
                    newCurrentVal = 7;
                    break;
                case 7:
                    if (this.n > 0) newCurrentVal = 6;
                    else newCurrentVal = 8;
                    break;
                case 8:
                    this.n = Math.random() * 4 + 2;
                    newCurrentVal = 0;
                    break;
            }
            this.current = newCurrentVal;
        }, parseInt(this.timeout));
    }

    stop() {
        clearInterval(this.intervalID);
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
        return ['current', 'timeout'];
    }

    attributeChangedCallback(prop, oldVal, newVal) {
        if (prop === 'current') this.render();
        if (prop === 'timeout') {
            clearInterval(this.intervalID);
            this.setInterv();
        }
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
            let pointsGained = 0;
            switch (parseInt(this.current)) {
                case 0:
                    pointsGained = 1;
                    break;
                case 1:
                    pointsGained = 1;
                    break;
                case 2:
                    pointsGained = 10;
                    break;
                case 3:
                    pointsGained = 10;
                    break;
                case 4:
                    pointsGained = -1;
                    break;
                case 5:
                    pointsGained = -1;
                    break;
                case 6:
                    pointsGained = -2;
                    break;
                case 7:
                    pointsGained = -2;
                    break;
                case 8:
                    pointsGained = 10;
                    break;

            }
            this.points = parseInt(this.points) + pointsGained;
            this.timeout -= pointsGained;
        });
    }

}


customElements.define('game-animation', GameAnimation);