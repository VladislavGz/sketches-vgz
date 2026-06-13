class Figure {

    constructor(length) {
        this.length = length;
        this.points = [];
    }

    /**
     * @param {Point} point 
     */
    setPoint(point) {
        this.points.push(point);

        if (this.points.length > this.length) {
            this.points.shift();
        }
    }

    setLength(length) {
        this.length = length;

        if (this.points.length > this.length) {
            while(this.points.length > this.length) {
                this.points.shift();
            }
        }
    }
}