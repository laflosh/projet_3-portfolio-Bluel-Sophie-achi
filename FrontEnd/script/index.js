main ();

async function main(){

    let projets = await fetch("http://localhost:5678/api/works").then(projets => projets.json());

    genereProjets(projets);
    gestionEvenementFiltre();

};

function genereProjets(projets){

    for (let i = 0 ; i < projets.length ; i++){

        let conteneurPrincipal = document.querySelector(".gallery");
        let conteneurProjet = document.createElement("figure");

        let imageProjets = document.createElement("img");
        imageProjets.src = projets[i].imageUrl;

        let legendeProjets = document.createElement("figcaption");
        legendeProjets.innerText = projets[i].title;

        conteneurProjet.appendChild(imageProjets);
        conteneurProjet.appendChild(legendeProjets);

        conteneurPrincipal.appendChild(conteneurProjet);

    };

};

function gestionEvenementFiltre(){

    

};