document.addEventListener('DOMContentLoaded', () => {
    const containerElement = document.querySelector('.canvas-container');
    const figures = new Figures(containerElement);

    const xAmpInput = document.querySelector('#x-amplitude');
    const xAmpValue = document.querySelector('#x-amp-val');

    const xPhaseInput = document.querySelector('#x-phase');
    const xPhaseValue = document.querySelector('#x-phase-val');

    const xFreqInput = document.querySelector('#x-freq');
    const xFreqValue = document.querySelector('#x-freq-val');

    const yAmpInput = document.querySelector('#y-amplitude');
    const yAmpValue = document.querySelector('#y-apm-val');

    const yPhaseInput = document.querySelector('#y-phase');
    const yPhaseValue = document.querySelector('#y-phase-val');

    const yFreqInput = document.querySelector('#y-freq');
    const yFreqValue = document.querySelector('#y-freq-val');

    const pointsInput = document.querySelector('#points');
    const pointsValue = document.querySelector('#points-val');

    xAmpInput.addEventListener('input', () => {
        const value = Number(xAmpInput.value);
        figures.xLine.setAmplitude(value);
        xAmpValue.textContent = value;
    });

    xPhaseInput.addEventListener('input', () => {
        const value = Number(xPhaseInput.value);
        figures.xLine.setPhase(Math.PI * value / 180);
        xPhaseValue.textContent = value;
    });

    xFreqInput.addEventListener('input', () => {
        const value = Number(xFreqInput.value);
        figures.xLine.setFrequency(value);
        xFreqValue.textContent = value;
    });

    yAmpInput.addEventListener('input', () => {
        const value = Number(yAmpInput.value);
        figures.yLine.setAmplitude(value);
        yAmpValue.textContent = value;
    });

    yPhaseInput.addEventListener('input', () => {
        const value = Number(yPhaseInput.value);
        figures.yLine.setPhase(Math.PI * value / 180);
        yPhaseValue.textContent = value;
    });

    yFreqInput.addEventListener('input', () => {
        const value = Number(yFreqInput.value);
        figures.yLine.setFrequency(value);
        yFreqValue.textContent = value;
    });

    pointsInput.addEventListener('input', () => {
        const value = Number(pointsInput.value);
        figures.figure.setLength(value);
        pointsValue.textContent = value;
    });
});