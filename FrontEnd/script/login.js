let tokenAdmin = null;

main ();
/*
Compte de test pour Sophie Bluel

```
email: sophie.bluel@test.tld

password: S0phie 
```
*/

function main(){

    connexionAdministrateur()

};

function connexionAdministrateur(){

    let formConnexionAdmin = document.getElementById("login");

    formConnexionAdmin.addEventListener("submit", (event) =>{

        event.preventDefault();

        tokenAdmin = recupererToken(event);

        tokenAdmin.then(function(resultat){
        
            if (resultat.userId === 1) {

                redirectionPageProjet();
    
            } else if (resultat.message === "user not found") {
                
                affichageMessageErreur();
    
            };    
        });

    });

};

async function recupererToken(event){

    let token = await fetch("http://localhost:5678/api/users/login", envoieIdentifiantUtilisateur(event))
    .then(tokenAdmin => tokenAdmin.json());

    return token;

};

function envoieIdentifiantUtilisateur(event){

    let identifiantUtilisateur = {

        email : event.target.querySelector("[name=email]").value,
        password : event.target.querySelector("[name=motDePasse]").value

    };

    const chargeUtile = JSON.stringify(identifiantUtilisateur);

    let data = {

        method : "POST",
        headers : {"content-type" : "application/json"},
        body : chargeUtile
    };

    return data;

};

function redirectionPageProjet(){

    document.location.href="index.html";

}

function sauvegardeLocalstorage(){



}

function affichageMessageErreur(){

    let formConnexionAdmin = document.getElementById("login");

    let messageErreur = document.createElement("span");
    messageErreur.innerText = "L'e-mail ou le mot de passe est incorrect";
    messageErreur.setAttribute("id", "messageErreur");

    formConnexionAdmin.appendChild(messageErreur);

};