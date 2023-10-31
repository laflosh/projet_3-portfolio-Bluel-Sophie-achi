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

        let tokenAdmin = recupererToken(event);

        console.log(tokenAdmin);

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

function affichageMessageErreur(){



};