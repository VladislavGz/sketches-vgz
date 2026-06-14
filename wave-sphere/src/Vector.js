class Vector {
    /**
     * @param {Vector} a 
     * @param {Vector} b 
     * @returns {Vector}
     */
    static sub (a, b) {
        return new Vector(
            a.x - b.x,
            a.y - b.y,
            a.z - b.z
        );
    }

    /**
     * Умножает вектор на скаляр, возвращая новый вектор
     * 
     * @param {Vector} vector 
     * @param {number} value 
     * @returns {Vector}
     */
    static mult (vector, value) {
        return new Vector(
            vector.x * value,
            vector.y * value,
            vector.z * value
        );
    }

    /**
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    constructor (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Возвращает длину вектора
     * 
     * @returns {number}
     */
    mag () {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }

    /**
      * Прибавляет переданный вектор к этому вектору.
      * Мутирует этот экземпляр.
      * 
      * @param {Vector} vector 
      */
    add (vector) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
    }

    /**
     * Вычитает переданный вектор из этого вектора.
     * Мутирует этот экземпляр.
     * 
     * @param {Vector} vector 
     */
    sub (vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        this.z -= vector.z;
    }

    /**
     * Делит вектор на скаляр
     * 
     * @param {number} value 
     */
    div (value) {
        this.x /= value;
        this.y /= value;
        this.z /= value;
    }

    /**
     * Задает координаты, соответствующие коррдинатам
     * переданного вектора
     * 
     * @param {Vector} vector 
     */
    set (vector) {
        this.x = vector.x;
        this.y = vector.y;
        this.z = vector.z;
    }
}