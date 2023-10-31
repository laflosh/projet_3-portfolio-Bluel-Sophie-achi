main ();

async function main(){

    let projets = await fetch("http://localhost:5678/api/works").then(projets => projets.json());

    afficherProjets(projets);
    gestionEvenementFiltre(projets);

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