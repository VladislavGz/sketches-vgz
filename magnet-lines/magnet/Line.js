function isAbsorbed(dx, dy) {
    return Math.abs(dx) < 5 && Math.abs(dy) < 5;
}

function pointIsOut(point, processor) {
    return point.x < 0 || point.x > processor.cnv.width || point.y < 0 || point.y > processor.cnv.height;
}

function calcForce(point, source, lineType) {
    let k = 1 * source.power;

    const dx = point.x - source.position.x;
    const dy = point.y - source.position.y;

    if (source.type !== lineType) {
        if (isAbsorbed(dx, dy)) return false;
        k = -1 * k;
    }

    if (dx === 0 && dy === 0) {
        return { fx: 0, fy: 0 };
    }

    const rsq = dx ** 2 + dy ** 2;
    const r = rsq ** 0.5;
    const force = k / rsq;

    const cos = dx / r;
    const sin = dy / r;

    return {
        fx: force * cos,
        fy: force * sin
    }
}

function calcVector(point, processor, lineType) {
    let fx = 0;
    let fy = 0;

    for (let i = 0; i < processor.sources.length; i++) {
        const source = processor.sources[i];

        const force = calcForce(point, source, lineType);
        if (!force) return false;

        fx += force.fx;
        fy += force.fy;
    }
    
    const f = (fx**2 + fy**2)**0.5;
    const vx = fx / f;
    const vy = fy / f;

    return new Vector(vx, vy);
}


function createLine(startPoint, startVector, processor, lineType) {
    const settings = processor.settings;

    const points = [startPoint];

    let vector = startVector;

    for (let i = 1; i < settings.maxLinePointsCount; i++) {
        const x = points[i - 1].x + settings.lineDiscretLength * vector.vx;
        const y = points[i - 1].y + settings.lineDiscretLength * vector.vy;
        const point = new Point(x, y);
        points.push(point);

        if (pointIsOut(point, processor)) break;
        vector = calcVector(point, processor, lineType);
        if (!vector) break;
    }

    return new Line(points);
}

class Line {
    constructor(points) {
        this.points = points;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i++) {
            const point = this.points[i];
            ctx.lineTo(point.x, point.y);
        }
        ctx.stroke();
    }
}