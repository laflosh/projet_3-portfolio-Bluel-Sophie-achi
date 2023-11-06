export function mainModal(){

    initialisationEvent();
    initialisationModaleListeProjets();

}

function initialisationEvent(){

    let boutonModal =document.getElementById("ouvrir-modal");
    boutonModal.addEventListener("click", ouvrirModalGallerie);

}

function initialisationModaleListeProjets(){

    let boiteModal =document.getElementById("modal-galerie");

    //Fonction de gestion fermeture modal galerie
    boiteModal.addEventListener("click", fermerModalGallerie); 

    let boutonFermerModal = document.getElementById("fermer-modal-galerie");
    boutonFermerModal.addEventListener("click", fermerModalGallerie);

    let stopPropagationDiv = document.querySelector(".js-modal-stop");
    stopPropagationDiv.addEventListener("click", stopPropagation);

    let boutonModalAjoutProjet =document.getElementById("btn-modal-envoie-projet");
    boutonModalAjoutProjet.addEventListener("click", ouvrirModalNouveauProjet);
}

function ouvrirModalGallerie(event){

    event.preventDefault();

    let boiteModal =document.getElementById("modal-galerie");
    boiteModal.style.display = 'flex';
    boiteModal.setAttribute("aria-hidden", false);

    afficherGallerieProjets();

};

function fermerModalGallerie(event){

    event.preventDefault();

    let boiteModal =document.getElementById("modal-galerie");
    boiteModal.style.display = 'none';
    boiteModal.setAttribute("aria-hidden", true);

};

function ouvrirModalNouveauProjet(event){

    event.preventDefault();

    let boiteModal =document.getElementById("modal-galerie");
    boiteModal.style.display = "none";
    boiteModal.setAttribute("aria-hidden", true);

    let boiteModalAjout =document.getElementById("modal-ajout-projet");
    boiteModalAjout.style.display = null;
    boiteModalAjout.setAttribute("aria-hidden", false);

    envoieNouveauProjet();

    //Fonction de gestion fermeture modal ajout projet
    boiteModalAjout.addEventListener("click", fermerToutesLesModals); 

    let boutonFermerModal = document.getElementById("fermer-modal-projet");
    boutonFermerModal.addEventListener("click", fermerModalAjoutProjet);

    let boutonFermerToutesLesModals = document.getElementById("fermer-modals");
    boutonFermerToutesLesModals.addEventListener("click", fermerToutesLesModals);

    let stopPropagationDiv = document.querySelector("#modal-ajout-projet .js-modal-stop");
    stopPropagationDiv.addEventListener("click", stopPropagation);

};

function fermerModalAjoutProjet(event){

    
    event.preventDefault();

    let boiteModal =document.getElementById("modal-galerie");
    boiteModal.style.display = null;
    boiteModal.setAttribute("aria-hidden", true);

    let boiteModalAjout =document.getElementById("modal-ajout-projet");
    boiteModalAjout.style.display = "none";
    boiteModalAjout.setAttribute("aria-hidden", true);

}

function fermerToutesLesModals(event){

    event.preventDefault();

    let boiteModal =document.getElementById("modal-galerie");
    boiteModal.style.display = "none";
    boiteModal.setAttribute("aria-hidden", true);

    let boiteModalAjout =document.getElementById("modal-ajout-projet");
    boiteModalAjout.style.display = "none";
    boiteModalAjout.setAttribute("aria-hidden", true);

}

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

                galerieImage.appendChild(conteneurImage(resultat[i].imageUrl, i + 1));

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
    boutonSupprimer.setAttribute("id", id);
    boutonSupprimer.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

    conteneur.appendChild(prout);
    conteneur.appendChild(boutonSupprimer);
    
    return conteneur;
};

function gestionEvenementBoutonSupprimer(){

    let boutonSupprimerAll = document.querySelectorAll(".btnSupprimer");

    boutonSupprimerAll.forEach( input => input.addEventListener("click", (event) =>{

        if(confirm('Voulez-vous supprimer ce travail ?')){
            event.preventDefault();
            recuperationBoutonSupprimerClick(event);
        }

    }));

}

function recuperationBoutonSupprimerClick(event){

    let boutonCliquer =event.target.id;

    console.log(boutonCliquer);
    supprimerProjet(boutonCliquer);

};

function supprimerProjet(id){

    let data = {
        method : "DELETE",
        headers : {
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${recupTokenLocalStorage()}`
        }
    };

    console.log(data);

    fetch("http://localhost:5678/api/works/" + id, data).then(reponse => {
        alert('supprimé')
    });

}

function envoieNouveauProjet(){

    let btnEnvoieNouveauProjet = document.getElementById("btn-envoie-projet");
    btnEnvoieNouveauProjet.addEventListener("click", (event) => {

        event.preventDefault();
        requeteNouveauProjet();

    });

};

function requeteNouveauProjet(){

    let data = {

        method : "POST",
        headers : {
            "Content-type" : "multipart/form-data",
            "Authorization" : `Bearer ${recupTokenLocalStorage()}`
        },
        body : recuperationDonneesNouveauProjet()

    }

    fetch("http://localhost:5678/api/works", data)
    .then(response => response.json())
    .catch((error) =>{
        // gestion de l'erreur pour prévenir l'utilisateur
        console.log(error);

        let spanErreur = document.getElementById("messageErreur");

        if (spanErreur === null){
        affichageMessage("Les informations renseignées ne sont pas correctes");
        } else {
            spanErreur.remove();
            affichageMessage("Les informations renseignées ne sont pas correctes");
        }
    });
};

function recuperationDonneesNouveauProjet(){

    let image = document.getElementById("projet");
    let titre = document.getElementById("nom-projet");
    let categorie = document.getElementById("categorie");

    let data = new FormData();
        data.append("image",image.files[0]);
        data.append("title", titre.value);
        data.append("category",categorie.value);

    console.log(data);

    return data;

};

function affichageMessage(msg) {

    let formEnvoieProjet = document.querySelector(".element");

    let messageErreur = document.createElement("span");
    messageErreur.innerText = msg;
    messageErreur.setAttribute("id", "messageErreur");

    formEnvoieProjet.appendChild(messageErreur);

};

function recupTokenLocalStorage(){

    let tokenAdmin = localStorage.getItem("token");
    tokenAdmin = JSON.parse(tokenAdmin);

    return tokenAdmin.token

}