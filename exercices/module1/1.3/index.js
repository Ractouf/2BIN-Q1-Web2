const button = document.querySelector("#button");
const h3 = document.querySelector("#h3");
const p = document.querySelector("#p");

let compteur = 0;

button.addEventListener("click", () => {
    if (++compteur === 1) p.innerText = `vous avez cliqué une fois`;
    else p.innerText = `vous avez cliqué ${compteur} fois`;

    if (compteur > 4 && compteur < 10) h3.innerText = "Bravo, bel échauffement !"
    if (compteur >= 10) h3.innerText = "Vous êtes passé maître en l'art du clic !"
    if (compteur >= 100) h3.innerText = "TROP DE PUISSANCE DE CLICK !!!"
});