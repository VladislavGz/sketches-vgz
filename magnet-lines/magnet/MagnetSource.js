class MagnetSource {

    constructor({
        position = new Point(0, 0),
        type = 'N',
        power = 1
    } = {}) {
        this.position = position
        this.type = type;
        this.power = power;

        this.processor = null;
        this.lines = [];
    }

    isNorth() {
        return this.type === 'N';
    }

    /**
     * 
     * @param {Processor} pocessor 
     */
    setParentProcessor(processor) {
        this.processor = processor;
    }
    
    calc() {
        if (!this.processor) return;
        //if (!this.isNorth()) return;
        const settings = this.processor.settings;

        this.lines = [];
        const angleStep = 2 * Math.PI / settings.lineCount;

        let angle = 0;
        for (let i = 0; i < settings.lineCount; i++) {
            const vector = createVectorFromAngle(angle);
            const line = createLine(this.position, vector, this.processor, this.type);
            this.lines.push(line);
            angle += angleStep;
        }
    }

    draw() {
        const ctx = this.processor.ctx;

        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#ffffff';

        ctx.beginPath();
        ctx.ellipse(this.position.x, this.position.y, 3, 3, 0, 0, 2 * Math.PI);
        ctx.fill();

        this.lines.forEach(line => line.draw(ctx));
    }
}