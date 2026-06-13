document.addEventListener('DOMContentLoaded', () => {
    const cnvContainer = document.querySelector('.cnv-container');
    const cnv = document.querySelector('.cnv');
    new LightsAnimation(cnvContainer, cnv);
});