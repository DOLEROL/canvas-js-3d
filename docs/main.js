// rectangular triangle
class Triangle{
    constructor(center, size){
        this.center = center
        this.size = size
    }

    generatePoints(figure){
        switch(figure.toLowerCase()){
            case "square":
                return this.square(this.center, this.size);
        }
    }

    square(center, size){
        size /= 2;

        return [
            { x: center.x - size, y: center.y + size, z: center.z },
            { x: center.x - size, y: center.y - size, z: center.z },
            { x: center.x + size, y: center.y - size, z: center.z },
            { x: center.x + size, y: center.y + size, z: center.z }
        ]
    }
}

class Square extends Triangle{
    #points = [];

    constructor(center, size){
        super(center, size);
        this.#points = super.generatePoints(Square.name);
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
                z = center.z + size
                break;
            case 1:
                x = center.x - size
                y = center.y + size
                z = center.z + size
                break;
            case 2:
                x = center.x - size
                y = center.y - size
                z = center.z + size
                break;
            case 3:
                x = center.x + size
                y = center.y - size
                z = center.z + size
                break;
            // ---------
            case 4:
                x = center.x + size
                y = center.y + size
                z = center.z - size
                break;
            case 5:
                x = center.x - size
                y = center.y + size
                z = center.z - size
                break;
            case 6:
                x = center.x - size
                y = center.y - size
                z = center.z - size
                break;
            case 7:
                x = center.x + size
                y = center.y - size
                z = center.z - size
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
    const spanX = document.getElementById("X")
    const scaleUP = document.getElementById("scaleUP")
    const scaleDOWN = document.getElementById("scaleDOWN")
    const radio = document.querySelectorAll('input[type="radio"]')

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

    function rotateY(point, deg, d){
        const rad = degToRad(deg);

        let z = point.z - d.z;
        let y = point.y - d.y;

        let zPrim = z * Math.cos(rad) - y * Math.sin(rad);
        let yPrim = z * Math.sin(rad) + y * Math.cos(rad);

        return { y: Math.round(yPrim + d.y), z: Math.round(zPrim + d.z) }; 
    }

    function rotateX(point, deg, mid){
        const rad = degToRad(deg);

        let z = point.z - mid.z;
        let x = point.x - mid.x;

        let zPrim = z * Math.cos(rad) - x * Math.sin(rad);
        let xPrim = z * Math.sin(rad) + x * Math.cos(rad);

        return { x: Math.round(xPrim + mid.x), z: Math.round(zPrim + mid.z) }; 
    }

    function scale(xy, z, zs, pC){
        return Math.round(
            Math.tan(
                Math.atan((xy - pC) / z)
            ) * zs + pC
        );
    }

    function rotateScaleAxisY(p1, deg, CAMERA, MID){
        spanY.innerText = deg.y
        spanX.innerText = deg.x

        const rX = rotateX(p1, deg.y, MID)
        const sX = scale(rX.x, rX.z, Z, CAMERA.x);

        const sY = scale(p1.y, rX.z, Z, CAMERA.y);


        return [ sX, sY ]
    }

    function rotateScaleAxisX(p1, deg, CAMERA, MID){
        spanY.innerText = deg.y
        spanX.innerText = deg.x

        const rY = rotateY(p1, deg.x, MID)
        const sY = scale(rY.y, rY.z, Z, CAMERA.y);

        const sX = scale(p1.x, rY.z, Z, CAMERA.x);

        return [ sX, sY ]
    }

    function rotateScale(p1, deg, CAMERA, MID){
        return deg.rot == "y" ? rotateScaleAxisY(p1, deg, CAMERA, MID) : rotateScaleAxisX(p1, deg, CAMERA, MID);
    }

// -------------------------------------------------

    const CAMERA = { 
        x: (canHeight + 1)/2,
        y: (canWidth + 1)/2,
        z: 0
    };

    let DEG = {
        x: 0,
        y: 0,
        rot: 'x'
    };

    let Z = 350;

// -------------------------------------------------

    const CENTER = { x: CAMERA.x, y: CAMERA.y, z: 100};
    const SIZE = 40;
    // const newSquare = new Square(CENTER, SIZE);


// -------------------------------------------------
//                  TEST
// -------------------------------------------------
    function drawWall(points){
        con.beginPath();
        con.moveTo(...rotateScale(points[0], DEG, CAMERA, CENTER));
        con.lineTo(...rotateScale(points[1], DEG, CAMERA, CENTER));
        con.lineTo(...rotateScale(points[2], DEG, CAMERA, CENTER));
        con.lineTo(...rotateScale(points[3], DEG, CAMERA, CENTER));
        con.lineTo(...rotateScale(points[0], DEG, CAMERA, CENTER));
        con.stroke();
    }

    function drawCube(cube){
        drawWall([cube[0], cube[1], cube[2], cube[3]])
        drawWall([cube[0], cube[3], cube[7], cube[4]])
        drawWall([cube[0], cube[1], cube[5], cube[4]])

        drawWall([cube[1], cube[2], cube[6], cube[5]])
        drawWall([cube[2], cube[3], cube[7], cube[6]])
        drawWall([cube[5], cube[4], cube[7], cube[6]])
    }

    const newCube = new Cube(CENTER, SIZE);
    console.log(newCube.getPoints())
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

        radio.forEach(element => {
            if(element.id == "radioX" && element.checked){
                DEG.x+=1;
                if(DEG.x > 360) DEG.x = 0;
                DEG.rot = 'x';
            }else if(element.id == "radioY" && element.checked){
                DEG.y+=1;
                if(DEG.y > 360) DEG.y = 0;
                DEG.rot = 'y'
            }
        });

        // drawWall(newSquare.getPoints())
        drawCube(newCube.getPoints())

        con.closePath();
        con.fillStyle = DEG.x > 90 && DEG.x < 270 ? "#ffd700" : "#ff80ed";
        con.fill();

    }, 1000/60)

    setTimeout(()=>{
        clearInterval(interval)
    }, 1000 * 100)

}

// -------------------------------------------------
//                  TODO
// -------------------------------------------------  
//
//  - Środek figury określa kolejność rysowania figury