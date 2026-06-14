class SphereParticle {
    /**
     * Меняет сетами значения двух частиц
     * 
     * @param {SphereParticle} a 
     * @param {SphereParticle} b 
     */
    static replace(a, b) {
        const ax = a.position.x;
        const ay = a.position.y;
        const az = a.position.z;
        const av = a.v;
        const adv = a.dv;

        a.position.x = b.position.x;
        a.position.y = b.position.y;
        a.position.z = b.position.z;
        a.v = b.v;
        a.dv = b.dv;

        b.position.x = ax;
        b.position.y = ay;
        b.position.z = az;
        b.v = av;
        b.dv = adv;
    }

    /**
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @param {number} v 
     * @param {number} dv 
     */
    constructor (x, y, z, v, dv) {
        this.position = new Vector(x, y, z);
        this.v = v;
        this.dv = dv;
    }
}