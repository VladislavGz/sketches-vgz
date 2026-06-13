function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    
    const lines = [];
    for (let i = 0; i < 150; i++) {
        const line = new Line();

        lines.push(line);
        container.append(line.element);
    }

    const draw = () => {
        const w = container.offsetWidth;
        const h = container.offsetHeight;

        lines.forEach(
            /**
             * @param {Line} line 
             */
            line => line.tick({ w, h })
        )

        requestAnimationFrame(draw);
    }

    draw();
});