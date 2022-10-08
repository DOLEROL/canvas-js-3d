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


