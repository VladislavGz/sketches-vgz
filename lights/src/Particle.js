class Particle {
    /**
     * @param {number} m 
     * @param {number} x 
     * @param {number} y 
     * @param {GradientMap} gradientMap 
     */
    constructor (m, x, y, gradientMap) {
        this.m = m;
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.gradientMap = gradientMap;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw (ctx) {
        const { x, y } = this.position;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.gradientMap.radius);
        this.gradientMap.gradientStopPoints.forEach(point => {
            gradient.addColorStop(point[0], point[1]);
        });

        ctx.beginPath();
        ctx.arc(x, y, this.gradientMap.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
    }
}