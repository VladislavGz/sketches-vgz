const particlesCount = 1000;
const M = 50;
const H = 0.99;
const HH = 0.01;
const R = 2 * Math.sqrt((4 * Math.PI * (200 ** 2) / particlesCount) / (2 * Math.sqrt(3)));
const mouseSensitivity = 0.00005;
const waveForce = 50;

/**
 * @type {SphereParticle[]}
 */
const particles = [];

function init () {
    for (let i = 0; i < particlesCount; i++) {
        particles.push(
            new SphereParticle(
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
                0,
                0
            )
        );
    }
}

/**
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} rotX 
 * @param {number} rotY 
 * @param {object | null} mPress 
 */
function draw (ctx, rotX, rotY, mPress) {
    for (let i = 0; i < particlesCount; i++) {
        const particleA = particles[i];

        for (let j = i + 1; j < particlesCount; j++) {
            const particleB = particles[j];

            const distVector = Vector.sub(particleA.position, particleB.position);
            const distance = distVector.mag();

            if (distance < R) {
                const aspect = (R - distance) / (2 * distance);
                const delta = Vector.mult(distVector, aspect);
                const deltaV = (particleB.v - particleA.v) / M;

                particleA.position.add(delta);
                particleB.position.sub(delta);
                particleA.dv += deltaV;
                particleB.dv -= deltaV;

                const aspectVA = 1.2 * (200 + particleA.v) / 200;
                const aspectVB = 1.2 * (200 + particleB.v) / 200;

                const color = Math.min(Math.max(125 + 0.5 * particleA.position.z, 0), 255);
                ctx.strokeStyle = `rgb(${color}, ${color}, ${color})`;
                ctx.beginPath();
                ctx.moveTo(particleA.position.x * aspectVA, particleA.position.y * aspectVA);
                ctx.lineTo(particleB.position.x * aspectVB, particleB.position.y * aspectVB);
                ctx.stroke();
            }

            if (particleA.position.z > particleB.position.z) SphereParticle.replace(particleA, particleB);
        }

        const magA = particleA.position.mag();
        const delta = Vector.mult(particleA.position, 100 / magA - 0.5);
        particleA.position.add(delta);

        let KX, KY, KZ;
        KZ = particleA.position.z;
        KX = particleA.position.x;

        const cosMx = Math.cos(rotX);
        const sinMx = Math.sin(rotX);
        const cosMy = Math.cos(rotY);
        const sinMy = Math.sin(rotY);

        particleA.position.z = (KZ * cosMx) - (KX * sinMx);
        particleA.position.x = (KZ * sinMx) + (KX * cosMx);

        KZ = particleA.position.z;
        KY = particleA.position.y;

        particleA.position.z = (KZ * cosMy) - (KY * sinMy);
        particleA.position.y = (KZ * sinMy) + (KY * cosMy);

        particleA.dv = particleA.dv - (particleA.v * HH);
        particleA.v = particleA.v + particleA.dv;
        particleA.dv = particleA.dv * H;
    }

    if (mPress) {  
        let minDist = Infinity;
        let minDistParticle = null;
        particles.forEach(particle => {
            if (particle.position.z <= 0) return;
            const distance = Math.sqrt((mPress.mx - particle.position.x) ** 2 + (mPress.my - particle.position.y) ** 2);
            if (distance < minDist) {
                minDist = distance;
                minDistParticle = particle;
            }
        });
        
        minDistParticle.dv = waveForce;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    /**
     * @type {HTMLDivElement}
     */
    const cnvContainer = document.querySelector('.cnv-container');

    /**
     * @type {HTMLCanvasElement}
     */
    const cnv = document.querySelector('.cnv');

    /**
     * @type {CanvasRenderingContext2D}
     */
    const ctx = cnv.getContext('2d');

    new ResizeObserver(() => {
        cnv.width = cnvContainer.offsetWidth;
        cnv.height = cnvContainer.offsetHeight;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.translate(0.5 * cnv.width, 0.5 * cnv.height);
    }).observe(cnvContainer);

    let rotX = 0;
    let rotY = 0;
    cnvContainer.addEventListener('mousemove', e => {
        rotX = (0.5 * cnv.width - e.offsetX) * mouseSensitivity;
        rotY = (0.5 * cnv.height - e.offsetY) * mouseSensitivity;
    });

    let mPress = null;
    cnvContainer.addEventListener('mousedown', (e) => {
        mPress = {
            mx: e.offsetX - 0.5 * cnv.width,
            my: e.offsetY - 0.5 * cnv.height
        };
    });

    cnvContainer.addEventListener('mouseup', () => {
        mPress = null;
    });

    init();

    setInterval(() => {
        ctx.clearRect(-0.5 * cnv.width, -0.5 * cnv.height, cnv.width, cnv.height);
        draw(ctx, rotX, rotY, mPress);
    }, 16);
});