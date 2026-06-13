export class Figure {
    constructor (maxLength) {
        this.maxLength = maxLength;
        this.points = [];
    }
    addPoint (p) {
        this.points.push(p);
        while (this.points.length > this.maxLength) this.points.shift();
    }
    setMaxLength (len) {
        this.maxLength = len;
        while (this.points.length > this.maxLength) this.points.shift();
    }
}