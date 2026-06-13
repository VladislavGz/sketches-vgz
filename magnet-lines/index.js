document.addEventListener('DOMContentLoaded', () => {
    const cnvContainer = document.querySelector('.canvas-container');
    const prc = new Processor(cnvContainer);

    prc.addSource(new MagnetSource({position: new Point(400, 400), type: 'N', power: 1}));
    prc.addSource(new MagnetSource({position: new Point(400, 420), type: 'S', power: 1}));
    prc.addSource(new MagnetSource({position: new Point(600, 400), type: 'N', power: 1}));
    prc.addSource(new MagnetSource({position: new Point(600, 420), type: 'S', power: 1}));
    
    prc.start();
})