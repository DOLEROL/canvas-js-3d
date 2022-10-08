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
//                  SETTINGS
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

    const CENTER = { x: CAMERA.x, y: CAMERA.y, z: 100};
    const SIZE = 40;


// -------------------------------------------------
//                  TEST
// -------------------------------------------------
    const newCube = new Cube(CENTER, SIZE);
    newCube.setCon(con);
    newCube.setSpanY(spanY);
    newCube.setSpanX(spanX);
    newCube.setCamera(CAMERA);
    newCube.setDeg(DEG);
    newCube.setZ(Z);

    let interval = setInterval(
        () => {
            con.clearRect(0, 0, canWidth, canHeight);

            radio.forEach(element => {
                if (element.id === "radioX" && element.checked) {
                    DEG.x+=1;
                    if(DEG.x > 360) DEG.x = 0;
                    DEG.rot = 'x';
                } else if (element.id === "radioY" && element.checked) {
                    DEG.y+=1;
                    if(DEG.y > 360) DEG.y = 0;
                    DEG.rot = 'y'
                }
            });

            newCube.setDeg(DEG);
            newCube.drawCube(newCube.getPoints());
        },
        1000/20
    )

    setTimeout(
        () => {
            clearInterval(interval)
        },
        1000 * 150
    )
}
