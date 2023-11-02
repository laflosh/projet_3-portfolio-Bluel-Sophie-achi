main();

/*
Compte de test pour Sophie Bluel

```
email: sophie.bluel@test.tld

password: S0phie 
```
*/

function main() {

    initEvent();

};

function initEvent() {
    let formConnexionAdmin = document.getElementById("login");

    formConnexionAdmin.addEventListener("submit", (event) => { valideForm(event) });
}

function valideForm(event) {

    event.preventDefault();

    /*
    //Check des donénes saisient
    if (!checkForm()) {
        affichageMessageErreur("L'e-mail ou le mot de passe est incorrect")
        return;
    }
    */

    recupererToken();

};

function recupererToken() {

    let data = {

        method: "POST",
        headers: { "content-type": "application/json" },
        body: recuperationDataDuForm()
    };

    fetch("http://localhost:5678/api/users/login", data)
        .then(tokenAdmin => tokenAdmin.json())
        .then( (resultat) => {

            if (resultat.userId === 1) {

                sauvegardeLocalstorage(resultat)
                redirectionPageProjet();

            } else if (resultat.message === "user not found") {

                affichageMessageErreur("L'e-mail ou le mot de passe est incorrect");

            }
        })
        .catch( (error) => {
            // gestion de l'erreur pour prévenir l'utilisateur
            console.log(error);
            affichageMessageErreur("Le serveur est indisponible, merci de revenir plus tard");
        });

};

function recuperationDataDuForm() {

    let identifiantUtilisateur = {

        email: document.querySelector("[name=email]").value,
        password: document.querySelector("[name=motDePasse]").value

    };

    return JSON.stringify(identifiantUtilisateur);

};

function redirectionPageProjet() {

    document.location.href = "index.html";

}

function sauvegardeLocalstorage(element) {

    let valeursElement = JSON.stringify(element);

    window.localStorage.setItem("token", valeursElement);

}

function affichageMessageErreur(msg) {

    let formConnexionAdmin = document.getElementById("login");

    let messageErreur = document.createElement("span");
    messageErreur.innerText = msg;
    messageErreur.setAttribute("id", "messageErreur");

    formConnexionAdmin.appendChild(messageErreur);

};