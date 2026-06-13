const data = [
    'Hello world!',
    document.querySelector('#text-en').content.textContent,
    getSplitString(120),
    'Привет мир!',
    document.querySelector('#text-ru').content.textContent,
    getSplitString(120),
    document.querySelector('#code').content.textContent,
    getSplitString(120),
    'Examples!',
    document.querySelector('#examples').content.textContent,
];

const config = {
    printTime: 0,
};

const paragraphTemplate = document.querySelector('#screen-paragraph-template').content.querySelector('.screen-paragraph');
const screenElem = document.querySelector('.screen');

/**
 * 
 * @param {HTMLParagraphElement} paragraph 
 * @param {String} symbol 
 * @returns {Promise}
 */
function addSymbol(paragraph, symbol) {
    return new Promise(resolve => {
        setTimeout(() => {
            const screen = paragraph.parentElement;
            if (symbol === '\n') symbol = '<br>';
            paragraph.innerHTML += symbol;
            screen.scrollTop = screen.scrollHeight - screen.offsetHeight;
            resolve();
        }, config.printTime);
    });
}

function getSplitString(count) {
    return '-'.repeat(count);
}

/**
 * 
 * @param {HTMLElement} screen 
 * @param {String} str 
 */
async function addParagraph(screen, str) {
    const p = paragraphTemplate.cloneNode();
    screen.append(p);
    p.previousElementSibling?.classList.remove('screen-paragraph_cursor');
    for (let c of str) {
        await addSymbol(p, c);
    }
}

/**
 * 
 * @param {HTMLElement} screen 
 * @param {String []} strArr 
 */
async function addParagraphList(screen, strArr) {
    for (let i = 0; i < strArr.length; i++) {
        await addParagraph(screen, strArr[i]);
    }
}

addParagraphList(screenElem, data);