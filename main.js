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

// -------------------------------------------------

    function degToRad(deg){
        return Math.PI * deg / 180;
    }

    function rotate_Y(point, deg, d){
        const rad = degToRad(deg);

        let z = point.z - d.z;
        let y = point.y - d.y;

        let zPrim = z * Math.cos(rad) - y * Math.sin(rad);
        let yPrim = z * Math.sin(rad) + y * Math.cos(rad);

        return { y: Math.round(yPrim + d.y), z: Math.round(zPrim + d.z) }; 
    }

    function rotate_X(point, deg, mid){
        const rad = degToRad(deg);

        let z = point.z - mid.z;
        let x = point.x - mid.x;

        let zPrim = z * Math.cos(rad) - x * Math.sin(rad);
        let xPrim = z * Math.sin(rad) + x * Math.cos(rad);

        return { x: Math.round(xPrim + mid.x), z: Math.round(zPrim + mid.z) }; 
    }

    function scale(xy, z, zs, po_xy){
        return Math.round(
            Math.tan(
                Math.atan((xy - po_xy) / z)
            ) * zs + po_xy
        );
    }

    function rotAndScl(p_1, deg, CAMERA, MID){
        spanY.innerText = deg

        const r_X = rotate_X(p_1, deg, MID)
        const s_X = scale(r_X.x, r_X.z, Z, CAMERA.x);

        const s_Y = scale(p_1.y, r_X.z, Z, CAMERA.y);
        // const r_Y = rotate_Y(p_1, 0, MID)
        // const s_Y = scale(r_Y.y, r_Y.z, Z, CAMERA.y);

        // console.log(p_1)
        // console.log(`DEG: ${DEG} \nXz:${r_X.z} Xs${s_X} Ys:${s_Y}`)

        return [ s_X, s_Y ]
    }



}
