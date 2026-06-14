class Particles {
    static options = {
        count: 200,
        lineLength: 100,

        particleSize: {
            baseSize: 0.2,
            functionalSize: false,
            functionalSizeCoef: 0.2,
        },

        style: {
            particleColor: '#aaaaaa',
            lineColor: '#444444'
        },

        maxSpeed: 0.3
    };

    constructor (containerElement, options) {
        this.containerElement = containerElement;

        this.options = options || Particles.options;
        this.particles = [];
        this.lines = [];

        this.cnv = document.createElement('canvas');
        this.ctx = this.cnv.getContext('2d');

        this.containerElement.append(this.cnv);

        this.initSize();
        this.initStyles();
        this.generateParticles();
        setInterval(() => {
            this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);
            this.calc();
            this.draw();
        }, 20);

        new ResizeObserver(() => this.initSize()).observe(this.containerElement);

    }

    initStyles () {
        this.cnv.style.display = 'block';
    }

    initSize () {
        this.cnv.height = this.containerElement.offsetHeight;
        this.cnv.width = this.containerElement.offsetWidth;
    }

    generateParticles () {
        for (let i = 0; i < this.options.count; i++) {
            this.particles.push(new Particle(this.cnv, this.options));
        }
    }

    calc () {
        const lineLengthSq = this.options.lineLength ** 2;
        this.lines = [];

        for (let particle of this.particles) {
            particle.posX += particle.velX;
            particle.posY += particle.velY;

            if (particle.posX > this.cnv.width) particle.posX = 0;
            if (particle.posX < 0) particle.posX = this.cnv.width;

            if (particle.posY > this.cnv.height) particle.posY = 0;
            if (particle.posY < 0) particle.posY = this.cnv.height;
        }

        for (let i = 0; i < this.particles.length; i++) {
            const currentParticle = this.particles[i];
            currentParticle.size = this.options.particleSize.baseSize;

            for (let j = i + 1; j < this.particles.length; j++) {
                const testParticle = this.particles[j];

                const dxSq = (currentParticle.posX - testParticle.posX) ** 2;
                const dySq = (currentParticle.posY - testParticle.posY) ** 2;
                const dr = dxSq + dySq;

                if (dr < lineLengthSq) {
                    this.lines.push({
                        pointA: {
                            posX: currentParticle.posX,
                            posY: currentParticle.posY
                        },

                        pointB: {
                            posX: testParticle.posX,
                            posY: testParticle.posY
                        }
                    });

                    if (this.options.particleSize.functionalSize) {
                        currentParticle.size += this.options.particleSize.functionalSizeCoef;
                        testParticle.size += this.options.particleSize.functionalSizeCoef;
                    }
                }
            }
        }
    }

    draw () {
        this.lines.forEach(line => this.drawLine(line));
        this.particles.forEach(particle => this.drawParticle(particle));
    }

    drawParticle (particle) {
        this.ctx.fillStyle = this.options.style.particleColor;
        this.ctx.beginPath();
        this.ctx.ellipse(particle.posX, particle.posY, 2 * particle.size, 2 * particle.size, 0, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    drawLine (line) {
        this.ctx.strokeStyle = this.options.style.lineColor;
        this.ctx.beginPath();
        this.ctx.moveTo(line.pointA.posX, line.pointA.posY);
        this.ctx.lineTo(line.pointB.posX, line.pointB.posY);
        this.ctx.stroke();
    }
}

class Particle {
    constructor (cnv, options) {
        this.velX = Math.random() * (2 * options.maxSpeed) - options.maxSpeed;
        this.velY = Math.random() * (2 * options.maxSpeed) - options.maxSpeed;
        this.posX = Math.random() * cnv.width;
        this.posY = Math.random() * cnv.height;
        this.size = options.particleSize.baseSize;
    }
}