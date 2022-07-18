class Square{
    #points = [];
    #center
    #size

    constructor(center, size){
        this.#center = center;
        this.#size = size;
        this.generatePoints(this.#center, this.#size)
    }

    generatePoints(center, size){
        size /= 2
        for(let i = 0; i < 4; i++){
            this.#points[i] = this.calcPosition(center, size, i)
        }
    }

    calcPosition(center, size, corner){
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

    getPoints(){
        return this.#points
    }
}

// -------------------------------------------------

class Cube{
    #points = [];
    #center
    #size

    constructor(center, size){
        this.#center = center;
        this.#size = size;
        this.generatePoints(this.#center, this.#size)
    }

    generatePoints(center, size){
        size /= 2
        for(let i = 0; i < 8; i++){
            this.#points[i] = this.calcPosition(center, size, i)
        }
    }

    calcPosition(center, size, corner){
        let x, y, z;
        switch(corner){
            case 0:
                x = center.x + size
                y = center.y + size
                z = center.y + size
                break;
            case 1:
                x = center.x - size
                y = center.y + size
                z = center.y + size
                break;
            case 2:
                x = center.x - size
                y = center.y - size
                z = center.y + size
                break;
            case 3:
                x = center.x + size
                y = center.y - size
                z = center.y + size
                break;
            // ---------
            case 4:
                x = center.x + size
                y = center.y + size
                z = center.y - size
                break;
            case 5:
                x = center.x - size
                y = center.y + size
                z = center.y - size
                break;
            case 6:
                x = center.x - size
                y = center.y - size
                z = center.y - size
                break;
            case 7:
                x = center.x + size
                y = center.y - size
                z = center.y - size
                break;
        }

        return { x, y, z }
    }

    getPoints(){
        return this.#points
    }
}

// -------------------------------------------------

window.onload = () => {
    const spanY = document.getElementById("Y")
    const scaleUP = document.getElementById("scaleUP")
    const scaleDOWN = document.getElementById("scaleDOWN")

    scaleUP.addEventListener("click", ()=>{
        Z += 10;
    })
    scaleDOWN.addEventListener("click", ()=>{
        Z -= 10;
    })

    const can = document.getElementById("canvas")
    const con = can.getContext("2d");
    const canWidth = can.width;
    const canHeight = can.height;

}
