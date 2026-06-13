class ControlLine {
    constructor() {
        this.amplitude = 1; //0...1 o.e.
        this.frequency = 1; //Hz
        this.phase = 0; //start phase: 0...2PI radians

        this.w = 2 * Math.PI * this.frequency;

        this.value = 0; //current tick value o.e. (-amplitude...+amplitude)
        this.calc(0);
    }

    /**
     * 
     * @param {number} amplitude 0...1
     */
    setAmplitude(amplitude) {
        this.amplitude = amplitude;
    }
    
    /**
     * @param {number} frequency 
     */
    setFrequency(frequency) {
        this.frequency = frequency;
        this.w = 2 * Math.PI * this.frequency;
    }

    /**
     * @param {number} phase start phase 0...2PI radians
     */
    setPhase(phase) {
        this.phase = phase;
    }

    /**
     * @param {number} time time (ms)
     */
    calc(time) {
        this.value = this.amplitude * Math.sin(this.w * 0.001 * time + this.phase);
    }
}