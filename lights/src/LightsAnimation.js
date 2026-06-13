const settings = {
    particles: 10,
    friction: 0.02,
    brightness: 63,
    color: {
        redDiapasone: [100, 255],
        greenDiapasone: [100, 255],
        blueDiapasone: [100, 255],
    },
    gradientStepCount: 150,
    forceK: 30,
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
        }, 16);

        cnv.addEventListener('click', (e) => {
            this.particles.push(
                new Particle(
                    1, e.offsetX, e.offsetY,
                    new GradientMap(settings.gradientStepCount, settings.brightness, Color.getRandomColor(settings.color))
                )
            );
        });
    }

    initSize () {
        this.cnv.width = this.cnvContainer.offsetWidth;
        this.cnv.height = this.cnvContainer.offsetHeight;
    }

    calc () {
        for (let i = 0; i < this.particles.length; i++) {
            const a = this.particles[i];

            for (let j = 0; j < this.particles.length; j++) {
                if (i === j) continue;
                const b = this.particles[j];

                const force = Vector.sub(b.position, a.position);
                const distance = Math.min(Math.max(force.mag(), 4), 1000);
                const strength = settings.forceK * a.m * b.m / distance ** 2;
                force.normalize();
                force.mult(strength / a.m);
                a.acceleration.add(force);
            }
        }

        this.particles.forEach(particle => {
            particle.velocity.add(particle.acceleration);
            particle.velocity.mult(1 - settings.friction);
            particle.position.add(particle.velocity);
            particle.acceleration.set(0, 0);

            if (particle.position.x < 0) {
                particle.position.x = this.cnv.width;
            } else if (particle.position.x > this.cnv.width) {
                particle.position.x = 0;
            }

            if (particle.position.y < 0) {
                particle.position.y = this.cnv.height;
            } else if (particle.position.y > this.cnv.height) {
                particle.position.y = 0;
            }
        });
    }

    draw () {
        this.particles.forEach(particle => particle.draw(this.ctx));
    }
}