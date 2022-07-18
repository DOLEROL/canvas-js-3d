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

// -------------------------------------------------

    const CAMERA = { 
        x: (canHeight + 1)/2,
        y: (canWidth + 1)/2,
        z: 0
    };

    let DEG = -2;
    let Z = 130;

// -------------------------------------------------

    const CENTER = { x: CAMERA.x, y: CAMERA.y, z: 100};
    const SIZE = 40;
    // const newSquare = new Square(CENTER, SIZE);


// -------------------------------------------------
//                  TEST
// -------------------------------------------------
    function drawWall(points){
        // rotAndScl(points[0], DEG, CAMERA, CENTER)
        // rotAndScl(points[1], DEG, CAMERA, CENTER)

        con.beginPath();
        con.moveTo(...rotAndScl(points[0], DEG, CAMERA, CENTER));
        con.lineTo(...rotAndScl(points[1], DEG, CAMERA, CENTER));
        con.lineTo(...rotAndScl(points[2], DEG, CAMERA, CENTER));
        con.lineTo(...rotAndScl(points[3], DEG, CAMERA, CENTER));
        con.lineTo(...rotAndScl(points[0], DEG, CAMERA, CENTER));
        con.stroke();
    }

    function drawCube(cube){
        // drawWall([cube[0], cube[4]])

        drawWall([cube[0], cube[1], cube[2], cube[3]])
        drawWall([cube[0], cube[3], cube[7], cube[4]])
        drawWall([cube[0], cube[1], cube[5], cube[4]])

        drawWall([cube[1], cube[2], cube[6], cube[5]])
        drawWall([cube[2], cube[3], cube[7], cube[6]])
        drawWall([cube[5], cube[4], cube[7], cube[6]])
    }

    const newCube = new Cube(CENTER, SIZE);

// -------------------------------------------------
//                  DEBUG
// -------------------------------------------------  
    // const {x: x0, y: y0, z: z0} = newCube.getPoints()[0]
    // const {x: x4, y: y4, z: z4} = newCube.getPoints()[4]
    // console.log(`${x0} ${y0} ${z0} | ${x4} ${y4} ${z4}`);
    // drawCube(newCube.getPoints())

// -------------------------------------------------

    let interval = setInterval(() => {
        con.clearRect(0, 0, canWidth, canHeight);

        DEG+=2;
        if(DEG > 360) DEG = 0;

        // drawWall(newSquare.getPoints())
        drawCube(newCube.getPoints())

        con.closePath();
        con.fillStyle = DEG > 90 && DEG < 270 ? "#ffd700" : "#ff80ed";
        con.fill();

    }, 1000/30)

    setTimeout(()=>{
        clearInterval(interval)
    }, 1000 * 10)

}

// -------------------------------------------------
//                  TODO
// -------------------------------------------------  
//
//  - Środek figury określa kolejność narysowania