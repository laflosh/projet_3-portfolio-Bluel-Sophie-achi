import  {mainModal}  from "./gestionModal.js";



main ();

function main(){

    initialisationPage()
    
};

async function initialisationPage(){

    //Récupération des données au lancements de la page
    let projets = await fetch("http://localhost:5678/api/works").then(projets => projets.json());
    let categories = await fetch("http://localhost:5678/api/categories").then(categories => categories.json());

    afficherProjets(projets);

    verificationAdmin(projets , categories);
}

function afficherProjets(projets){

    document.querySelector(".gallery").innerHTML = "";

    let conteneurPrincipal = document.querySelector(".gallery");

    for (let i = 0 ; i < projets.length ; i++){

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

function afficherBoutonFiltres(categories){

    let conteneurCategorie = document.querySelector(".filtres");

    conteneurCategorie.appendChild(genereBouton('0', 'Tous'));

    for (let i = 0 ; i < categories.length ; i++) {
        conteneurCategorie.appendChild(genereBouton(categories[i].id, categories[i].name));
    };
}

function genereBouton( id, name){

    let btn = document.createElement("button");
    btn.setAttribute("id", "btn_" + id);
    btn.setAttribute("class", "btn-" + id);
    btn.textContent = name;

    return btn;
}

function gestionEvenementFiltre(projets, categories){


    let btnTous = document.getElementById("btn_0");
    btnTous.addEventListener("click", () => {

        afficherProjets(projets);

    });


    let btnObjets = document.getElementById("btn_1");
    btnObjets.addEventListener("click", () => {

        afficherProjets(filtreProjets(projets, categories[0]));

    });


    let btnApt = document.getElementById("btn_2");
    btnApt.addEventListener("click", () => {

        afficherProjets(filtreProjets(projets, categories[1]));

    });


    let btnHotel = document.getElementById("btn_3");
    btnHotel.addEventListener("click", () => {
    
        afficherProjets(filtreProjets(projets, categories[2]));

    });

};

function filtreProjets(projets,categories){

    let projetsFiltrer = Array.from(projets);

    for (let i = projetsFiltrer.length -1 ; i >= 0 ; i--){

        if (projetsFiltrer[i].categoryId !== categories.id){
    
            projetsFiltrer.splice(i ,1 );
    
        };
    
    };
    
    return projetsFiltrer;

}

function verificationAdmin(projets , categories){

    let tokenAdmin = window.localStorage.getItem("token");
    tokenAdmin = JSON.parse(tokenAdmin);

    if (tokenAdmin === null){

        afficherBoutonFiltres(categories);
        gestionEvenementFiltre(projets , categories);
        console.log("pas admin");

    } else if (tokenAdmin.userId === 1){

        affichageAdmin();
        mainModal();
        console.log("admin")

    }

}

function affichageAdmin(){

    let boutonModal = document.getElementById("afficher-modal");
    boutonModal.style.display = null;

    let boutonsFiltres = document.querySelector(".filtres");
    boutonsFiltres.style.display = "none";

    let titreProjets = document.querySelector("#portfolio h2");
    titreProjets.style.margin = "0 0 95px 0";

    let lienLogIn = document.getElementById("lienLogIn");

    let lienLogOut = document.createElement("a");
    lienLogOut.setAttribute("href", "index.html");
    lienLogOut.innerText = "logout";

    lienLogIn.replaceChildren(lienLogOut);

    lienLogOut.addEventListener("click", () => {

        window.localStorage.removeItem("token");

    })

}