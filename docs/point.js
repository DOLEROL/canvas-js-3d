class Point
{
    #x;
    #y;
    #z;

    constructor(x, y, z)
    {
        this.#x = x;
        this.#y = y;
        this.#z = z;
    }

    getCords()
    {
        return {
            x: this.#x,
            y: this.#y,
            z: this.#z
        }
    }
}