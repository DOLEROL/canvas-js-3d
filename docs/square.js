class Square
{
    #points = [];
    #center
    #size

    constructor(center, size)
    {
        this.#center = center;
        this.#size = size;
        this.generatePoints(this.#center, this.#size)
    }

    generatePoints(center, size)
    {
        size /= 2
        for(let i = 0; i < 4; i++){
            this.#points[i] = this.calcPosition(center, size, i)
        }
    }

    calcPosition(center, size, corner)
    {
        let x, y;

        switch(corner){
            case 0:
                x = center.x + size
                y = center.y + size
                break;
            case 1:
                x = center.x - size
                y = center.y + size
                break;
            case 2:
                x = center.x - size
                y = center.y - size
                break;
            case 3:
                x = center.x + size
                y = center.y - size
                break;
        }

        return { x, y, z: center.z }
    }

    getPoints()
    {
        return this.#points
    }
}
