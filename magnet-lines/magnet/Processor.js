class Processor {

    /**
     * 
     * @param {HTMLElement} cnvContainer 
     */
    constructor(cnvContainer, {
        lineCount = 36,
        maxLinePointsCount = 10000,
        lineDiscretLength = 2,
        simPeriod = 20,
    } = {}) {
        this.cnv = cnvContainer.querySelector('.canvas');
        this.ctx = this.cnv.getContext('2d');

        this.settings = {
            lineCount,
            maxLinePointsCount,
            lineDiscretLength,
            simPeriod
        }

        this.mouse = {
            x: 0,
            y: 0,
            hoverSource: null,
            holdSource: null
        }

        this.isRunned = false;
        this.timer = null;

        this.sources = [];

        new ResizeObserver(() => {this.initSize()}).observe(cnvContainer);
        
        this.cnv.addEventListener('mousemove', (evt) => {
            this.mouse.x = evt.offsetX;
            this.mouse.y = evt.offsetY;
            
            this.mouse.hoverSource = this.checkSourceHover();

            if (this.mouse.holdSource) {
                const source = this.mouse.holdSource;
                source.position.x += evt.movementX;
                source.position.y += evt.movementY;
            }
        });
        
        this.cnv.addEventListener('mousedown', () => {
            this.mouse.holdSource = this.mouse.hoverSource;
        });

        this.cnv.addEventListener('mouseup', () => {
            this.mouse.holdSource = null;
        });
    }

    checkSourceHover() {
        if (this.mouse.holdSource) {
            return this.mouse.holdSource;
        }

        if (!this.hoverPos) {
            const x = this.mouse.x;
            const y = this.mouse.y;

            for (let i = 0; i < this.sources.length; i++) {
                const sourcePos = this.sources[i].position;
                
                if (x > sourcePos.x - 20 && x < sourcePos.x + 20 && y > sourcePos.y - 20 && y < sourcePos.y + 20) {
                    return this.sources[i];
                }
            }
            
        }

        return null;
    }

    drawHover() {
        if (!this.mouse.hoverSource) return;
        const pos = this.mouse.hoverSource.position;

        this.ctx.strokeStyle = '#00ff00';
        this.ctx.beginPath();
        this.ctx.ellipse(pos.x, pos.y, 20, 20, 0, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    initSize() {
        this.cnv.width = this.cnv.offsetWidth;
        this.cnv.height = this.cnv.offsetHeight;
    }

    clearCnv() {
        this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);
    }

    start() {
        if (this.isRunned) return;

        this.isRunned = true;
        this.timer = setInterval(() => {
            this.process();
        }, this.settings.simPeriod);
    }

    stop() {
        if (!this.isRunned) return;

        this.isRunned = false;
        this.clearCnv();
        clearInterval(this.timer);
        this.timer = null;
    }

    /**
     * 
     * @param {MagnetSource} source 
     */
    addSource(source) {
        this.sources.push(source);
        source.setParentProcessor(this);
    }

    process() {
        this.calc();
        this.clearCnv();
        this.draw();
        this.drawHover();
    }

    calc() {
        this.sources.forEach(source => source.calc());
    }

    draw() {
        this.sources.forEach(source => source.draw());
    }
}