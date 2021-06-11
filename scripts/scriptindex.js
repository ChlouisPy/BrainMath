window.onscroll = function () {
    /* Fonction qui sera actualisé à chaque scroll de la page*/
    scrollfonction();
};

// permet de récupérer l'echelle de la fentre // des difficultés à fonctionnées
echelle_window = window.devicePixelRatio;

// liste des nombres hexa décimaux 
let hexa = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];


function scrollfonction() {
    /* toutes les fonctions qui serons exécutés au moment du scoll*/
    // fonctions qui serons modifier lors du scroll 

    let scroll_y = window.scrollY; // pour ne pas avoir besoin de call cette fonctiontout le temps

    // permet de faire disparaitre et de faire varier les apramètres de la bar de menu
    cacher_boite_menu(scroll_y);

    cacher_apparaitre_logo(scroll_y);
};

function cacher_boite_menu(scroll_y) {
    /* 
    fonction pour gérer l'entête/bar de menu
    Elle réduit l'entête et réduit ses couleurs
    Argument : scroll_y correspond aux coordonnées du scoll en y
    */

    if (scroll_y > 160) {
        // si le scrolle est suffisament bas mettre l'interface simple
        document.querySelector(".menubarreboite").style = "width: 99.5%; border-radius: 0px; background-image:"
            + " linear-gradient(white, white), linear-gradient(to right,white, white);";
    } else {
        // Garder le titre normale sur les 33 premier y pixels
        if (scroll_y < (33)) {
            // ne pas faire bouger la taille du cadre si il n'est pas suiffisant pour ne pas contenir tous les titres 
            document.querySelector(".menubarreboite").style = "width: 99%; " +
                "border-radius: 10px; " +
                "background-image:linear-gradient(white, white), linear-gradient(to right,#B200FF, #0093FF); ";
        } else if (scroll_y > 133) {

            // faire diapraitre lentement les bordures 
            transparent_niveau = Math.round(((scroll_y - 100) / 4 * -1 + 16) * echelle_window);

            document.querySelector(".menubarreboite").style = "width: " + (33 * echelle_window) + "%; " +
                "border-radius: 30px; " +
                "background-image:linear-gradient(white, white), " +
                "linear-gradient(to right,#B200FF" + (hexa[transparent_niveau])
                + "8,  #0093FF" + (hexa[transparent_niveau]) + "8);";

        } else {
            // Faire rétrécire le cadre si la taille est suffisante 
            // Ne pas toucher la fonction mathémattique de calcul de la taille
            document.querySelector(".menubarreboite").style = "width: " +
                (99 - (0.66 * (scroll_y - 33) / (echelle_window / 0.5 - 1)) * echelle_window)
                + "%; border-radius: 30px; " +
                "background-image:linear-gradient(white, white), " +
                "linear-gradient(to right,#B200FF, #0093FF); ";
        }
        ;
    }
    ;
};

function cacher_apparaitre_logo(scroll_y) {
    /* Fonction pour faire apparaitre puis dispraitre le logo avec le tire en dessous de l'acceuil
    Argument : scroll_y correspond aux coordonnées du scoll en y
    */
    // faire apparaitre de 166 --> 300
    // faire disparaitre de 433 --> 533
    if (scroll_y > 300 && scroll_y < 333) {
        // faire apparaitre au début le logo
        document.querySelector("#Bienvenue").style = "visibility: visible; opacity: 100%;";
    } else if (scroll_y < 300) {
        // puis garder affiché quelques scoll le logo
        document.querySelector("#Bienvenue").style = "opacity:" + (scroll_y - 133) + "%;";
    } else if (scroll_y > 333) {
        // Puis enfin faire dispraitre le logo
        document.querySelector("#Bienvenue").style = "opacity:" + (100 - (scroll_y - 333)) + "%;";
    }
    ;
};
