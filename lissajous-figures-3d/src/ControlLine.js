export class ControlLine {
    constructor (amplitude = 1, frequency = 1, phase = 0) {
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.phase = phase;
        this.w = 2 * Math.PI * this.frequency;
        this.value = 0;
    }
    setAmplitude (v) { this.amplitude = v; }
    setFrequency (v) { this.frequency = v; this.w = 2 * Math.PI * v; }
    setPhase (v) { this.phase = v; }
    calc (timeSec) {
        this.value = this.amplitude * Math.sin(this.w * timeSec + this.phase);
    }
}