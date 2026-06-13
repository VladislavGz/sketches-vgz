function createVectorFromAngle(angle) {
    const vector = new Vector(0, 0);
    vector.setAngle(angle);
    return vector;
}

class Vector {
    constructor(vx, vy) {
        this.vx = vx,
        this.vy = vy
    }

    setAngle(angle) {
        this.vx = Math.cos(angle);
        this.vy = Math.sin(angle);
    }
}