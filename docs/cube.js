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
        return [
            [this.#points[0], this.#points[1], this.#points[2], this.#points[3]],
            [this.#points[0], this.#points[3], this.#points[7], this.#points[4]],
            [this.#points[0], this.#points[1], this.#points[5], this.#points[4]],

            [this.#points[1], this.#points[2], this.#points[6], this.#points[5]],
            [this.#points[2], this.#points[3], this.#points[7], this.#points[6]],
            [this.#points[5], this.#points[4], this.#points[7], this.#points[6]]
        ]
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
        this.drawOrder(cube).forEach((wallPoints, index) => this.drawWall(wallPoints[0], index))
    }

    drawOrder(cube)
    {
        return cube
            .map(
                (item) => {
                    let rot = item.map(
                        (yaItem) => this.rotateXY(yaItem, this.#DEG, this.#CENTER)
                    )

                    return [rot, this.avg(rot)]
                }
            )
            .sort(
                (a, b) => b[1] - a[1]
            )
    }

    avg(points)
    {
        return (points[0].z + points[1].z + points[2].z + points[3].z) / 4
    }

    drawWall(points, index)
    {
        this.#con.beginPath();
        this.#con.moveTo(...this.scaleAxisXY(points[0], this.#DEG, this.#CAMERA));
        this.#con.lineTo(...this.scaleAxisXY(points[1], this.#DEG, this.#CAMERA));
        this.#con.lineTo(...this.scaleAxisXY(points[2], this.#DEG, this.#CAMERA));
        this.#con.lineTo(...this.scaleAxisXY(points[3], this.#DEG, this.#CAMERA));
        this.#con.lineTo(...this.scaleAxisXY(points[0], this.#DEG, this.#CAMERA));
        this.#con.stroke();

        this.#con.closePath();
        this.#con.fillStyle = index % 2 === 0 ? "#ffd700" : "#ff80ed";
        // this.#con.fillStyle = this.#DEG.x > 90 && this.#DEG.x < 270 ? "#ffd700" : "#ff80ed";
        this.#con.fill();
    }

    scaleAxisXY (point, deg, CAMERA)
    {
        this.#spanY.innerText = deg.y;
        this.#spanX.innerText = deg.x;

        const sY = this.scale(point.y, point.z, this.#Z, CAMERA.y);
        const sX = this.scale(point.x, point.z, this.#Z, CAMERA.x);

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
