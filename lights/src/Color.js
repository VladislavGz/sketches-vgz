class Color {
    /**
     * @param {Object} [param0={}] 
     * @param {number[]} [param0.redDiapasone=[0, 255]] 
     * @param {number[]} [param0.greenDiapasone=[0, 255]] 
     * @param {number[]} [param0.blueDiapasone=[0.155]] 
     * @returns {Color}
     */
    static getRandomColor ({
        redDiapasone = [0, 255],
        greenDiapasone = [0, 255],
        blueDiapasone = [0.155]
    } = {}) {
        return new Color(
            Math.floor(Math.random() * (redDiapasone[1] - redDiapasone[0] + 1) + redDiapasone[0]),
            Math.floor(Math.random() * (greenDiapasone[1] - greenDiapasone[0] + 1) + greenDiapasone[0]),
            Math.floor(Math.random() * (blueDiapasone[1] - blueDiapasone[0] + 1) + blueDiapasone[0])
        );
    }

    /**
     * @param {number} r 
     * @param {number} g 
     * @param {number} b 
     */
    constructor (r, g, b) {
        this.red = r;
        this.green = g;
        this.blue = b;
    }
}