const settings = {
    particles: 10,
    friction: 0.02,
    brightness: 63,
    color: {
        redDiapasone: [100, 255],
        greenDiapasone: [100, 255],
        blueDiapasone: [100, 255],
    },
    gradientStepCount: 150
};

class LightsAnimation {
    /**
     * @param {HTMLDivElement} cnvContainer 
     * @param {HTMLCanvasElement} cnv 
     */
    constructor (cnvContainer, cnv) {
        this.cnvContainer = cnvContainer;
        this.cnv = cnv;
        this.ctx = cnv.getContext('2d');
        this.particles = [];

        this.initSize();

        for (let i = 0; i < settings.particles; i++) {
            const m = 1;
            const x = Math.random() * cnv.width;
            const y = Math.random() * cnv.height;
            this.particles.push(
                new Particle(
                    1, x, y,
                    new GradientMap(settings.gradientStepCount, settings.brightness, Color.getRandomColor(settings.color))
                )
            );
        }

        new ResizeObserver(() => {
            this.initSize();
        }).observe(this.cnvContainer);

        setInterval(() => {
            this.calc();
            this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);
            this.ctx.globalCompositeOperation = "lighter";
            this.draw();
        });
    }

    initSize () {
        this.cnv.width = this.cnvContainer.offsetWidth;
        this.cnv.height = this.cnvContainer.offsetHeight;
    }

    calc () {

    }

    draw () {
        this.particles.forEach(particle => particle.draw(this.ctx));
    }
}