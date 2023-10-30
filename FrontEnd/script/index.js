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

async function gestionEvenementFiltre(){

    let projets = await fetch("http://localhost:5678/api/works").then(projets => projets.json());
    let categories = await fetch("http://localhost:5678/api/categories").then(categories => categories.json());


    let btnTous = document.querySelector(".btn-tous");
    btnTous.addEventListener("click", () => {

        document.querySelector(".gallery").innerHTML = "";
        genereProjets(projets);

    });


    let btnObjets = document.querySelector(".btn-objets");
    btnObjets.addEventListener("click", () => {

        let projetsObjets = Array.from(projets);

        for (let i = projetsObjets.length -1 ; i >= 0 ; i--){

            if (projetsObjets[i].categoryId !== categories[0].id){
        
                projetsObjets.splice(i ,1 );
        
            };
        
        };

        document.querySelector(".gallery").innerHTML = "";
        genereProjets(projetsObjets);

    });


    let btnApt = document.querySelector(".btn-apt");
    btnApt.addEventListener("click", () => {

        let projetsApt = Array.from(projets);

        for (let i = projetsApt.length -1 ; i >= 0 ; i--){

            if (projetsApt[i].categoryId !== categories[1].id){
        
                projetsApt.splice(i ,1 );
        
            };
        
        };

        document.querySelector(".gallery").innerHTML = "";
        genereProjets(projetsApt);

    });


    let btnHotel = document.querySelector(".btn-hotels");
    btnHotel.addEventListener("click", () => {

        let projetsHotel = Array.from(projets);

        for (let i = projetsHotel.length -1 ; i >= 0 ; i--){

            if (projetsHotel[i].categoryId !== categories[2].id){
        
                projetsHotel.splice(i ,1 );
        
            };
        
        };

        document.querySelector(".gallery").innerHTML = "";
        genereProjets(projetsHotel);

    });

};