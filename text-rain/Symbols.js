class Symbols {
    static _symbols = [];
    static _counter = 0;
    static _dc = 33;

    static getSymbol() {
        const symbol = this._symbols[this._counter];
        
        this._counter += this._dc;
        if (this._counter > this._symbols.length) {
            this._counter = this._counter - this._symbols.length - 1;
        }

        return symbol;
    }

    static getRandomSymbol() {
        // Диапазоны для примера: основные латинские (2 байта) и китайские иероглифы (4 байта)
        const ranges = [
            [0x0041, 0x005A], // Латинский алфавит (A-Z)
            //[0x0400, 0x04FF], // Кириллица
            [0x4E00, 0x9FFF], // Китайские иероглифы (CJK Unified Ideographs)
        ];

        const range = ranges[Math.floor(Math.random() * ranges.length)];
        const randomCodePoint = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];

        return String.fromCodePoint(randomCodePoint);
    }

    static init(count) {
        for (let i = 0; i < count; i++) {
            const c = this.getRandomSymbol();
            this._symbols.push(c);
        }
    }
}

Symbols.init(1000);

