main ();

async function main(){

    let projets = await fetch("http://localhost:5678/api/works").then(projets => projets.json());

    let tokenAdmin = window.localStorage.getItem("token");
    tokenAdmin = JSON.parse(tokenAdmin);

    console.log(tokenAdmin);

    if (tokenAdmin === null){

        afficherProjets(projets);
        gestionEvenementFiltre(projets);
        console.log("pas admin");

    } else if (tokenAdmin.userId === 1){

        afficherProjets(projets);
        affichageAdmin();
        affichageModaleModificationProjet();
        console.log("admin")

    }

};

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

async function gestionEvenementFiltre(projets){

    let categories = await fetch("http://localhost:5678/api/categories").then(categories => categories.json());


    let btnTous = document.getElementById("btnFiltreTous");
    btnTous.addEventListener("click", () => {

        afficherProjets(projets);

    });


    let btnObjets = document.getElementById("btnFiltreObjets");
    btnObjets.addEventListener("click", () => {

        afficherProjets(filtreProjets(projets, categories[0]));

    });


    let btnApt = document.getElementById("btnFiltreAppartement");
    btnApt.addEventListener("click", () => {

        afficherProjets(filtreProjets(projets, categories[1]));

    });


    let btnHotel = document.getElementById("btnFiltreHotel");
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

function affichageAdmin(){

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

function affichageModaleModificationProjet(){



}