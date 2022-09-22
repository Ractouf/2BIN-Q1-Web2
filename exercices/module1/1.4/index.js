const redLight = document.querySelectorAll("div");
let direction = true;
let compteur = 0;

startRedLight();

function startRedLight() {
    setInterval(redLightFunction, 1000);
}

function redLightFunction() {
    let light = redLight[compteur];

    if (compteur < redLight.length) {
        if (compteur === 0) {
            redLight[compteur + 1].style.backgroundColor = ""
        }
        if (direction && compteur !== 0) {
            redLight[compteur - 1].style.backgroundColor = ""
        } else {
            redLight[compteur + 1].style.backgroundColor = ""
        }
    }

    if (direction) {
        light.style.backgroundColor = light.id;

        if (compteur === redLight.length - 1) {
            direction = !direction;
        } else {
            compteur ++;
        }
    }
    if (!direction) {
        light.style.backgroundColor = light.id;

        if (compteur === 0) {
            direction = !direction;
            compteur ++;
        } else {
            compteur --;
        }
    }

}