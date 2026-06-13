class Line {
    constructor() {
        this.element = document.createElement('p');
        this.element.classList.add('line');

        this.length = 0;
        this.currentSymbol = 0;
        this.redrawFlag = false;
        this.fontSize = 0;
    }

    tick(containerData) {
        if (this.redrawFlag) return;

        if (this.length === 0) {
            this.redrawFlag = true;

            setTimeout(() => {
                this.redraw(containerData);
            }, getRandomInt(0, 10000));

            return;
        }

        if (this.currentSymbol === this.length) {
            const waitTime = this.endCycle();

            this.redrawFlag = true;

            setTimeout(() => {
                this.redraw(containerData);
            }, waitTime);

            return;
        }

        const span = document.createElement('span');
        span.textContent = Symbols.getSymbol();
        span.classList.add('letter');
        span.style.fontSize = `${this.fontSize}px`;
        this.element.append(span);

        this.currentSymbol++;
    }

    endCycle() {
        let delay = 0;

        for (let i = 0; i < this.length - 1; i++) {
            const child = this.element.children[i];

            child.style.animation = `anim ${1000}ms linear ${delay}ms forwards`;

            delay += 100;
        }

        const lastChild = this.element.children[this.length - 1];
        lastChild.style.animation = `anim ${3000}ms linear ${delay}ms forwards`;

        return delay + 3000 + getRandomInt(0, 2000);
    }

    redraw({ w, h } = {}) {
        this.element.replaceChildren();
        this.element.style.top = `${getRandomInt(0, h)}px`;
        this.element.style.left = `${getRandomInt(0, w)}px`;
        this.length = getRandomInt(5, 20);
        this.fontSize = getRandomInt(10, 20);
        this.currentSymbol = 0;
        this.redrawFlag = false;
    }
}