class area
{
    #points;
    #groups = [];
    #CENTER
    #DEG
    #CAMERA
    #Z
    #size
    #con
    #spanY
    #spanX

    constructor(size)
    {
        this.#size = size;
        this.#points = new Array(this.#size.x).fill(0).map(() => new Array(this.#size.z));
        this.generatePoints();
        this.generateGroups();
        this.calcCenter();
    }

    calcCenter()
    {
        let x = (this.#points[0][0].x + this.#points[49][0].x) / 2
        let y = 60
        let z = (this.#points[0][0].z + this.#points[0][49].z) / 2
        
        this.#CENTER = {x, y, z}
    }

    generatePoints()
    {
        for (let z = 0; z < this.#size.z; z++) {
            for (let x = 0; x < this.#size.x; x++) {
                this.#points[x][z] = {x: x * 10 + 50, y: Math.floor(Math.random() * 31) + 20, z: (z * 10) + 100};
            }
        }
    }

    generateGroups()
    {
        for (let z = 0; z < this.#size.z - 1; z++) {
            for (let x = 0; x < this.#size.x - 1; x++) {
                this.#groups[(x + (z * (this.#size.x - 1))) * 2] = [
                    this.#points[x][z],
                    this.#points[x + 1][z],
                    this.#points[x + 1][z + 1]
                ]

                this.#groups[(x + (z * (this.#size.x - 1))) * 2 + 1] = [
                    this.#points[x][z],
                    this.#points[x][z + 1],
                    this.#points[x + 1][z + 1]
                ]
            }
        }
    }

    getGroups()
    {
        return this.#groups
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

    drawArea()
    {
        this.drawOrder(this.#groups).forEach(
            (wallPoints, index) => this.drawWall(wallPoints[0], index)
        )
    }

    drawOrder(groups)
    {
        return groups
            .map(
                (item) => {
                    let rot = item.map(
                        (yaItem) => this.rotateXY(yaItem, this.#DEG, this.#CENTER)
                    )

                    return [
                        rot,
                        (rot) => (rot[0].z + rot[1].z + rot[2].z) / 3
                    ]
                }
            )
            .sort(
                (a, b) => b[1] - a[1]
            )
    }

    drawWall(points, index)
    {
        this.#con.beginPath();
        this.#con.moveTo(...this.scaleAxisXY(points[0], this.#DEG, this.#CAMERA));
        this.#con.lineTo(...this.scaleAxisXY(points[1], this.#DEG, this.#CAMERA));
        this.#con.lineTo(...this.scaleAxisXY(points[2], this.#DEG, this.#CAMERA));
        this.#con.lineTo(...this.scaleAxisXY(points[0], this.#DEG, this.#CAMERA));
        this.#con.stroke();

        this.#con.closePath();
        this.#con.fillStyle = index % 2 === 0 ? "#ffd700" : "#ff80ed";
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
