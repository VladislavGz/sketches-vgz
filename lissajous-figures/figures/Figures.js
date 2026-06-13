class Figures {
    static options = {
        dt: 10, //delta time (ms)

        style: {
            ballSize: 6,
            ballColor: '#aaaaaa',
            particleColor: '#aaaaaa',
            lineColor: '#777777',
            markerColor: '#333333',
            figureColor: '#00ff00'
        },

        drawDiapasone: [0.1, 0.9]
    };

    /**
     * @param {HTMLDivElement} cnv 
     */
    constructor(containerElement) {
        this.containerElement = containerElement;
        this.cnv = document.createElement('canvas');
        this.ctx = this.cnv.getContext('2d');
        this.containerElement.append(this.cnv);

        this.circleMode = 'circle'; //circle || line

        this.xLine = new ControlLine();
        this.yLine = new ControlLine();
        this.figure = new Figure(20);

        this.initSize();
        this.initStyles();

        new ResizeObserver(() => this.initSize()).observe(this.containerElement);

        this.time = 0; //current tick time (s)

        setInterval(() => {
            this.tick(this.time);
            this.time += Figures.options.dt;;
        }, Figures.options.dt);
    }

    initStyles () {
        this.cnv.style.display = 'block';
        this.cnv.style.width = '100%';
        this.cnv.style.height = '100%';
    }

    initSize () {
        this.cnv.height = this.containerElement.offsetHeight;
        this.cnv.width = this.containerElement.offsetWidth;
    }

    tick() {
        this.calc(this.time);
        this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);
        this.draw();
    }

    /**
     * @param {number} time current tick time (ms)
     */
    calc(time) {
        this.xLine.calc(time);
        this.yLine.calc(time);
        const point = new Point(this.xLine.value, this.yLine.value);
        this.figure.setPoint(point);
    }

    draw() {
        const centerOE = 0.5 * (Figures.options.drawDiapasone[0] + Figures.options.drawDiapasone[1]);
        const amplitudeOE = Figures.options.drawDiapasone[1] - Figures.options.drawDiapasone[0];
        const xCenterCrd = centerOE * this.cnv.width;
        const yCenterCrd = centerOE * this.cnv.height;

        //draw xLine
        const xAmplitudeCrd = amplitudeOE * this.cnv.width * this.xLine.amplitude;
        const xStartCrd = xCenterCrd - 0.5 * xAmplitudeCrd;
        const xEndCrd = xStartCrd + xAmplitudeCrd;
        this.ctx.strokeStyle = Figures.options.style.lineColor;
        this.ctx.beginPath();
        this.ctx.moveTo(xStartCrd, 0);
        this.ctx.lineTo(xEndCrd, 0);
        this.ctx.stroke();

        //draw xMarker
        const xPosCrd = xCenterCrd - this.xLine.value * 0.5 * amplitudeOE * this.cnv.width;
        this.ctx.strokeStyle = Figures.options.style.markerColor;
        this.ctx.beginPath();
        this.ctx.moveTo(xPosCrd, 0);
        this.ctx.lineTo(xPosCrd, this.cnv.height);
        this.ctx.stroke();

        //draw xBall
        this.ctx.fillStyle = Figures.options.style.ballColor;
        this.ctx.beginPath();
        this.ctx.ellipse(xPosCrd, 0, Figures.options.style.ballSize, Figures.options.style.ballSize, 0, 0, 2 * Math.PI);
        this.ctx.fill();

        //draw yLine
        const yAmplitudeCrd = amplitudeOE * this.cnv.height * this.yLine.amplitude;
        const yStartCrd = yCenterCrd - 0.5 * yAmplitudeCrd;
        const yEndCrd = yStartCrd + yAmplitudeCrd;
        this.ctx.strokeStyle = Figures.options.style.lineColor;
        this.ctx.beginPath();
        this.ctx.moveTo(0, yStartCrd);
        this.ctx.lineTo(0, yEndCrd);
        this.ctx.stroke();

        //draw yMarker
        const yPosCrd = yCenterCrd - this.yLine.value * 0.5 * amplitudeOE * this.cnv.height;
        this.ctx.strokeStyle = Figures.options.style.markerColor;
        this.ctx.beginPath();
        this.ctx.moveTo(0, yPosCrd);
        this.ctx.lineTo(this.cnv.width, yPosCrd);
        this.ctx.stroke();

        //draw yBall
        this.ctx.fillStyle = Figures.options.style.ballColor;
        this.ctx.beginPath();
        this.ctx.ellipse(0, yPosCrd, Figures.options.style.ballSize, Figures.options.style.ballSize, 0, 0, 2 * Math.PI);
        this.ctx.fill();

        //draw figure
        this.ctx.beginPath();
        this.ctx.strokeStyle = Figures.options.style.figureColor;
        const startPoint = this.figure.points[0];
        let xCrd = xCenterCrd - startPoint.x * 0.5 * amplitudeOE * this.cnv.width;
        let yCrd = yCenterCrd - startPoint.y * 0.5 * amplitudeOE * this.cnv.height;
        this.ctx.moveTo(xCrd, yCrd);
        for (let i = 1; i < this.figure.points.length; i++) {
            const {x, y} = this.figure.points[i];
            xCrd = xCenterCrd - x * 0.5 * amplitudeOE * this.cnv.width;
            yCrd = yCenterCrd - y * 0.5 * amplitudeOE * this.cnv.height;
            this.ctx.lineTo(xCrd, yCrd);
        }
        this.ctx.stroke();

        //draw Ball
        this.ctx.fillStyle = Figures.options.style.figureColor;
        this.ctx.beginPath();
        this.ctx.ellipse(xCrd, yCrd, Figures.options.style.ballSize, Figures.options.style.ballSize, 0, 0, 2 * Math.PI);
        this.ctx.fill();
    }
}