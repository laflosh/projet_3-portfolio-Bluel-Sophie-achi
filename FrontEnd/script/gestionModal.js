export function mainModal(){

    initialisationEvent();

}

function initialisationEvent(){

    let boutonModal =document.getElementById("ouvrir-modal");
    boutonModal.addEventListener("click", (event) =>{

        ouvrirModalGallerie(event);

    });

}

function ouvrirModalGallerie(event){

    event.preventDefault();

    let boiteModal =document.getElementById("modal-galerie");
    boiteModal.style.display = null;
    boiteModal.setAttribute("aria-hidden", false);

    afficherGallerieProjets();

    //Fonction de gestion fermeture modal galerie
    boiteModal.addEventListener("click", (event) => {

        fermerModalGallerie(event);

    }); 

    let boutonFermerModal = document.getElementById("fermer-modal");
    boutonFermerModal.addEventListener("click", (event) => {

        fermerModalGallerie(event);

    });

    let stopPropagationDiv = document.querySelector(".js-modal-stop");
    stopPropagationDiv.addEventListener("click", (event) => {

        stopPropagation(event);

    });

};

function fermerModalGallerie(event){

    event.preventDefault();

    let boiteModal =document.getElementById("modal-galerie");
    boiteModal.style.display = "none";
    boiteModal.setAttribute("aria-hidden", true);

    boiteModal.removeEventListener("click", (event) => {

        fermerModalGallerie(event);

    })
    let boutonFermerModal = document.getElementById("fermer-modal");
    boutonFermerModal.removeEventListener("click", (event) => {

        fermerModalGallerie(event);

    });
    let stopPropagationDiv = document.querySelector(".js-modal-stop");
    stopPropagationDiv.removeEventListener("click", (event) => {

        stopPropagation(event);

    });

};

function stopPropagation(event) {

    event.stopPropagation();

}

function afficherGallerieProjets(){

    document.querySelector(".modal .gallery").innerHTML = "";

    fetch("http://localhost:5678/api/works")
        .then(projets => projets.json())
        .then((resultat) => {

            console.log(resultat);
        
            let galerieImage = document.querySelector(".modal .gallery");

            for (let i = 0; i < resultat.length ; i++){

                galerieImage.appendChild(conteneurImage(resultat[i].imageUrl, i));

            }

            gestionEvenementBoutonSupprimer();

        });

};

function conteneurImage(image, id){

    let conteneur = document.createElement("div");
    conteneur.setAttribute("class","image-galerie");

    let prout = document.createElement("img");
    prout.src = image;
    let boutonSupprimer = document.createElement("button");
    boutonSupprimer.setAttribute("class","btnSupprimer");
    boutonSupprimer.setAttribute("id","btnSupprimer_"+ id);
    boutonSupprimer.innerText = "X";

    conteneur.appendChild(prout);
    conteneur.appendChild(boutonSupprimer);
    
    return conteneur;
};

function gestionEvenementBoutonSupprimer(){

    let boutonSupprimerAll = document.querySelectorAll(".btnSupprimer");

    boutonSupprimerAll.forEach( input => input.addEventListener("click", (event) =>{

        recuperationBoutonSupprimerClick(event);

    }));

}

function recuperationBoutonSupprimerClick(event){

    let boutonCliquer =event.target;

    console.log(boutonCliquer);

};