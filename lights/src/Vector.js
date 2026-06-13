class Vector {
    /**
     * Возвращает новый вектор, являющийся результатом разницы двух векторов
     * 
     * @param {Vector} a 
     * @param {Vector} b 
     * @returns {Vector}
     */
    static sub (a, b) {
        return new Vector(a.x - b.x, a.y - b.y);
    }

    /**
     * @param {number} x 
     * @param {number} y 
     */
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Возвращает величину вектора
     * 
     * @returns {number}
     */
    mag () {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    /**
     * Приводит длину вектора к 1, не изменяя пропорции
     */
    normalize () {
        const mag = this.mag();
        if (mag === 0) return;

        this.x /= mag;
        this.y /= mag;
    }

    /**
     * Умножает вектор на скаляр
     * 
     * @param {number} value 
     */
    mult (value) {
        this.x *= value;
        this.y *= value;
    }

    /**
     * Складывает вектора, мутируя этот экземпляр
     * 
     * @param {Vector} vector 
     */
    add (vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    /**
     * Устанавливает новые коррдинаты вектора
     * 
     * @param {number} x 
     * @param {number} y 
     */
    set (x, y) {
        this.x = x;
        this.y = y;
    }
}