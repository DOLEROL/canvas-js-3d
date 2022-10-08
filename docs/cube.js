class Cube
{
    #points = [];
    #CENTER
    #DEG
    #CAMERA
    #Z
    #size
    #con
    #spanY
    #spanX

    constructor(CENTER, size)
    {
        this.#CENTER = CENTER;
        this.#size = size;
        this.generatePoints(this.#CENTER, this.#size)
    }

    generatePoints(center, size)
    {
        size /= 2
        for(let i = 0; i < 8; i++){
            this.#points[i] = this.calcPosition(center, size, i)
        }
    }

    calcPosition(center, size, corner)
    {
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

    setCon(con)
    {
        this.#con = con;
    }

    setSpanY(spanY)
    {
        this.#spanY = spanY;
    }

    setSpanX(spanX)
    {
        this.#spanX = spanX;
    }

    setCamera(CAMERA)
    {
        this.#CAMERA = CAMERA
    }

    setDeg(DEG)
    {
        this.#DEG = DEG;
    }

    setZ(Z)
    {
        this.#Z = Z;
    }

    drawCube(cube)
    {
        this.drawWall([cube[0], cube[1], cube[2], cube[3]])
        this.drawWall([cube[0], cube[3], cube[7], cube[4]])
        this.drawWall([cube[0], cube[1], cube[5], cube[4]])

        this.drawWall([cube[1], cube[2], cube[6], cube[5]])
        this.drawWall([cube[2], cube[3], cube[7], cube[6]])
        this.drawWall([cube[5], cube[4], cube[7], cube[6]])
    }

    drawWall(points)
    {
        this.#con.beginPath();
        this.#con.moveTo(...this.rotateScaleAxisXY(points[0], this.#DEG, this.#CAMERA, this.#CENTER));
        this.#con.lineTo(...this.rotateScaleAxisXY(points[1], this.#DEG, this.#CAMERA, this.#CENTER));
        this.#con.lineTo(...this.rotateScaleAxisXY(points[2], this.#DEG, this.#CAMERA, this.#CENTER));
        this.#con.lineTo(...this.rotateScaleAxisXY(points[3], this.#DEG, this.#CAMERA, this.#CENTER));
        this.#con.lineTo(...this.rotateScaleAxisXY(points[0], this.#DEG, this.#CAMERA, this.#CENTER));
        this.#con.stroke();

        this.#con.closePath();
        this.#con.fillStyle = this.#DEG.x > 90 && this.#DEG.x < 270 ? "#ffd700" : "#ff80ed";
        this.#con.fill();
    }

    rotateScaleAxisXY (point, deg, CAMERA, MID)
    {
        this.#spanY.innerText = deg.y;
        this.#spanX.innerText = deg.x;

        const rot = this.rotateXY(point, deg, MID);

        const sY = this.scale(rot.y, rot.z, this.#Z, CAMERA.y);
        const sX = this.scale(rot.x, rot.z, this.#Z, CAMERA.x);

        return [ sX, sY ]
    }

    scale(xy, z, zs, pC)
    {
        return Math.round(
            Math.tan(
                Math.atan((xy - pC) / z)
            ) * zs + pC
        );
    }

    rotateXY(point, deg, mid)
    {
        const radX = this.degToRad(deg.x);
        const radY = this.degToRad(deg.y);

        let x = point.x - mid.x;
        let y = point.y - mid.y;
        let z = point.z - mid.z;

        let zPrim = (z * Math.cos(radX) - x * Math.sin(radX));
        let xPrim = (z * Math.sin(radX) + x * Math.cos(radX)) + mid.x;

        let zPrimPrim = (zPrim * Math.cos(radY) - y * Math.sin(radY)) + mid.z;
        let yPrim = (zPrim * Math.sin(radY) + y * Math.cos(radY)) + mid.y;

        return { x: xPrim, y: yPrim, z: zPrimPrim };
    }

    degToRad(deg)
    {
        return Math.PI * deg / 180;
    }
}
