class GradientMap {
    /**
     * @param {number} distance
     * @param {number} brightness 
     * @param {Color} color 
     * @returns {string}
     */
    static getColorAtDistance = (distance, brightness, color) => {
        if (distance === 0) return "rgb(255, 255, 255)";
        const param = brightness / distance ** 2;
        const rComp = Math.min(255, Math.floor(color.red * param));
        const gComp = Math.min(255, Math.floor(color.green * param));
        const bComp = Math.min(255, Math.floor(color.blue * param));
        return `rgb(${rComp}, ${gComp}, ${bComp})`;
    };

    /**
     * @param {number} stepCount 
     * @param {number} brightness 
     * @param {Color} color 
     */
    constructor (stepCount, brightness, color) {
        this.radius = Math.sqrt(255 * brightness);
        this.gradientStopPoints = [];

        for (let i = 0; i < stepCount; i++) {
            const t = Math.pow(i / stepCount, 1.2);
            const distance = t * this.radius;
            this.gradientStopPoints.push([t, GradientMap.getColorAtDistance(distance, brightness, color)]);
        }
    }
}