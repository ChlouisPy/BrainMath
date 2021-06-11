////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GENERATION DE CALCULS ALEATOIRE
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
Fonctions javascript qui permettent de générer des calculs aléatoirs en fonction de la difficulté 

les différentes difficultés :

 - Facile :
    Comprend 2 nombres dont un qui peut être un entier à deux chiffre [0 ; 25]
    Comprend les opérateurs suivants : + , - , * , /

 - Moyen
    Comprend deux nombres avec eux chiffre chacun [0 ; 50]
    Comprend les opérateurs suivants : + , - , * , /

 - Difficile
    Comprend trois nombres contenant entre 1 et 2 chiffre ([0 ; 50] ; [-1 ; 50] ; [0 ; 20])
    Comprend les opérateurs suivants : + , - , * , / , ( , )
 */

const OPERATEURS = ["+", "-", "*", "/"];

/*
Fonctions de bases
*/

function random(min, max) {
    /*
    Cette fonction retroune un nombre aléatoire comprit entre min exclu et max inclu
    :param min : nombre minimum à retourner 
    :param max : nombre maximum aléatorie (exclu)
    :return un nombre aléatoire entre min et max (exclu)
    */
    return Math.floor(Math.random() * (max - min)) + min + 1;
};

function choix(liste) {
    /*
    Cette fonction retroune un élément aléatoire dans une slice/liste/array
    :param liste : liste dont il faut selectionner un élement 
    :return l'un des élément de la liste
    */
    return liste[random(-1, liste.length - 1)];
};

function melangeur(liste) {
    /*
    cette fonction mélange une liste
    :param liste : la liste à mélanger 
    :return : la liste mélangée 
    */
    // la liste finale
    let melange_liste = [];
    // la liste des index déjà utilises
    let random_utilise = [];
    // pour chaque element dans la liste
    for (let i = 0; i < liste.length; i++) {
        let r = random(-1, liste.length - 1)

        while (random_utilise.includes(r)) {
            r = random(-1, liste.length - 1);
        };
        //ajouter dans la liste finale la valeur de l'index de la liste de base
        melange_liste.push(liste[r]);
        // ajouter l'index random dans les index déjà utilises
        random_utilise.push(r);
    };

    return melange_liste;
};

/* fonctions principale du jeu */

function generation_calcul(difficulte) {
    /*
    Cette fonction retroune un calcul qui respect les conditions à partir d'une difficulte
    argument : difficulte : compris entre 1 et 3, 1 etant facile, 2 moyen et 23 difficile
    :param difficulte : la difficulté des calculs
    :return le calcul complet 
    */
    // variable qui contient le calcul finale
    let calcul = "";

    // pour les trois modes de génération d'un calcul
    if (difficulte === 1) {
        calcul = calcul_facile();

    } else if (difficulte === 2) {
        calcul = calcul_moyen();

    } else if (difficulte === 3) {
        calcul = calcul_difficile();
    };


    return calcul;
};

/* fonction de génération de calculs */

function calcul_facile() {
    /*
    Cette fonction retroune un calcul simple
    :return un calcul facile
    */
    let calcul = "";

    let premier_nombre = random(0, 25); // le zero est exclu pour ne pas faire des calculs trop simpls
    let second_nombre = random(0, 9);
    let operateur = choix(OPERATEURS);

    calcul = (premier_nombre.toString()) + " " + operateur + " " + (second_nombre.toString());

    // faire en sorte que le calcul soit possible sans changer l'opérateur
    while (calcul_juste(calcul) === false) {
        premier_nombre = random(0, 25);
        second_nombre = random(0, 9);
        calcul = (premier_nombre.toString()) + " " + operateur + " " + (second_nombre.toString());
    };

    return calcul;
};


function calcul_moyen() {
    /*
    Fonction qui va retrouner un calcul moyen
    :return un calcul d'une difficulté moyenne 
    */
    let calcul = "";
    let premier_nombre = random(0, 50);
    let second_nombre = random(0, 50);

    let operateur = choix(OPERATEURS);

    calcul = (premier_nombre.toString()) + " " + operateur + " " + (second_nombre.toString());

    // faire en sorte que le calcul soit possible sans changer l'opérateur
    while (calcul_juste(calcul) === false) {
        premier_nombre = random(0, 50);
        second_nombre = random(0, 50);
        calcul = (premier_nombre.toString()) + " " + operateur + " " + (second_nombre.toString());
    };

    return calcul;
};


function calcul_difficile() {
    /*
    Fonction qui va retrouner un calcul
    :return un calcul d'une difficulté difficil 
    */
    let calcul = "";
    let premier_nombre = random(0, 50);
    let second_nombre = random(-1, 50); // ajoue du zero pour faire un piège ;)
    let troisieme_nombre = random(0, 20);

    // creation des deux opérateur
    let premier_operateur = choix(OPERATEURS);
    let second_operateur = choix(OPERATEURS);

    // tois possibilités
    // sans parenthèses = 0
    // parenthèses au début = 1
    // parenthèses à la fin = 2

    let random_parenthese = random(-1, 2);

    if (random_parenthese === 0) {
        calcul = (premier_nombre.toString()) + " " +
            premier_operateur + " " +
            (second_nombre.toString()) + " " +
            second_operateur + " " +
            (troisieme_nombre.toString());
    } else if (random_parenthese === 1) {
        calcul = "(" +
            (premier_nombre.toString()) + " " +
            premier_operateur + " " +
            (second_nombre.toString()) +
            ")" + " " +
            second_operateur + " " +
            (troisieme_nombre.toString());
    } else {
        calcul = (premier_nombre.toString()) + " " +
            premier_operateur + " " +
            "(" +
            (second_nombre.toString()) + " " +
            second_operateur + " " +
            (troisieme_nombre.toString()) +
            ")";
    };

    // faire en sorte que le calcul soit possible sans changer l'opérateur
    while (calcul_juste(calcul) === false) {
        /* Si le calcul n'est pas faisable alors en sans changer les opetéreur regénérer les entiers*/
        premier_nombre = random(0, 50);
        second_nombre = random(-1, 50); // ajoue du zero pour faire un piège ;)
        troisieme_nombre = random(0, 20);

        if (random_parenthese === 0) {
            calcul = (premier_nombre.toString()) + " " +
                premier_operateur + " " +
                (second_nombre.toString()) + " " +
                second_operateur + " " +
                (troisieme_nombre.toString());
        } else if (random_parenthese === 1) {
            calcul = "(" +
                (premier_nombre.toString()) + " " +
                premier_operateur + " " +
                (second_nombre.toString()) +
                ")" + " " +
                second_operateur + " " +
                (troisieme_nombre.toString());
        } else {
            calcul = (premier_nombre.toString()) + " " +
                premier_operateur + " " +
                "(" +
                (second_nombre.toString()) + " " +
                second_operateur + " " +
                (troisieme_nombre.toString()) +
                ")";
        };
    };

    return calcul;
};

/* fonctions de vérifications */

function calcul_juste(calcul) {
    /* cette fonction rtroune true si le calcul respecte les règles (pas de virgule ni de négatifs)
    ou False si il ne les respectes pas
    Argument : calcul : contient sous forme d'un string le calcul à vérifier
    */

    // le résultat du calcul
    let resultat = eval(calcul);

    // vérifier que le nombre n'est pas négatif
    if (resultat <= 0) {
        return false;
    };

    // vérifier qu'il n'y ai pas de nombre à virgule
    if (resultat % 1 !== 0) {
        return false;
    };
    // si le résultat n'a pas de défaut alors retrouner true
    return true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GENERATION DE QCM
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
L'un des script ajoute les calculs dans le QCM et les réponses possibles aléatoirement
L'un des script permet de vérifier toutes les réponses et de modifer les couleurs en fonction des bonnes et mauvaises
réponses et fait apparaitre le score calculé

point à faire attention, l'utilisateur peut selectionner plusieurs réponses ou ne rien choisir
Eviter aussi les duplications dans les mauvaises réponses
*/

let reponse_index = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


function demarage_qcm(difficulte) {
    /*
    Cette fonction sert au démarage pour afficher toutes les questions et les réponses Plausibles dans le QCM
    :param difficulte : la difficulté des calculs dans le QCM
     */

    // pour chaque question du QCM (10 questions)
    for (let q = 0; q < 10; q++) {
        let id = "#q" + (q);
        let calcul = generation_calcul(difficulte);
        /*
        // ajouter le calcul dans la liste de calcul
        liste_calcul[q] = calcul;
        // ajouter le résultat dans la liste de resultat
        let resultat = eval(calcul);
        liste_reponse[q] = resultat;
         */
        let resultat = eval(calcul);

        // généréer les mauvaises réponses plausibles
        let plausibles_reponses = [0, 0, 0];

        for (let i = 0; i < 3; i++) {
            // une réponses plausible temporaire
            let plausible_reponse_temp = resultat + random(-4, 4);

            // vérifier que cette proposition n'a pas déjà été fait ou que ce n'est pas la bonne réponses
            while (plausible_reponse_temp === resultat ||
                plausibles_reponses.includes(plausible_reponse_temp) ||
                plausible_reponse_temp < 0) {

                plausible_reponse_temp = resultat + random(-4, 3);
            };
            // ajouter la réponse plausible tempauraire dans la liste des réponses plausibles
            plausibles_reponses[i] = plausible_reponse_temp;
        };
        // ajouter la bonne réponses dans toutes les réponses et mélanger la liste
        plausibles_reponses.push(resultat);
        plausibles_reponses = melangeur(plausibles_reponses);

        // placer les réponses dans le QCM
        // pour chaque une des 4 réponses
        for (let i = 0; i < 4; i++) {
            let id_reponse = "#l" + (q.toString()) + (i.toString());
            document.querySelector(id_reponse).innerHTML = plausibles_reponses[i].toString();
        }

        // ajouter l'index de la solution dans la liste des reponses
        reponse_index[q] = plausibles_reponses.indexOf(resultat);

        // afficher le calcul dans le QCM
        document.querySelector(id).innerHTML = "#" + (q + 1) + " : &emsp; " + calcul;
    };

    return 0;
};


function verification_qcm(difficulte) {
    /*
    Fonction qui va vérifier toutes les réponses du QCM et qui va faire apparaitre le score
    */
    // contient toutes les cases cochés pour chaque questions
    let coche = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    // pour chaque une des 10 questions
    for (let q = 0; q < 10; q++) {

        // vérification de chaque case check
        for (let i = 0; i < 4; i++) {
            // récupération de la case check ou pas
            let id = "#r" + (q.toString()) + (i.toString());
            let check = document.querySelector(id).checked;

            // désactiver la case
            document.querySelector(id).disabled = true;

            // vérifier le check et si c'est la bonne réponses
            if (check == true) {
                // si la case est coché
                if (i == reponse_index[q]) {
                    // si la réponses est bonne
                    coche[q][i] = 2;
                } else {
                    // si la réponses n'est pas bonne
                    coche[q][i] = 1;
                };
            } else {
                // si la case n'est pas choché
                if (i == reponse_index[q]) {
                    // si l'utilisateur n'a pas choché la bonne réponse
                    coche[q][i] = 1;
                } else {
                    // si l'utilisateur n'a pas coché la mauvaise réponses
                    coche[q][i] = 0;
                };

            };

        };

    };

    // calculr le score
    let note = 0

    for (let q = 0; q < 10; q++) {
        if (coche[q].includes(2)) {
            if (!coche[q].includes(1)) {
                note += 1;
            };
        };
    };

    // modification de l'interface graphique

    // modification des couleurs des réponses
    for (let q = 0; q < 10; q++) {
        for (let i = 0; i < 4; i++) {
            // générer les id pour le label
            let id = "#l" + (q.toString()) + (i.toString());

            // vérifier quel est l'index de la bonne réponses set adapter les couleurs

            if (i == reponse_index[q]) {
                document.querySelector(id).style = "color: #2FCE47; font-weight: bold;";
            } else {
                document.querySelector(id).style = "color: #EA1717;";
            };
        };
    };

    // faire apparaitre le résultat
    document.querySelector("#score").style = "visibility: visible;";

    // faire apparaitre la note
    document.querySelector("#note").innerHTML = (note).toString() + " / 10";

    // si la note est de 10/10 la mettre en or
    if (note === 10) {
        document.querySelector("#note").style = "background: #FFD700; " +
            "-webkit-background-clip: text;" +
            "-webkit-text-fill-color: transparent;" +
            "-webkit-background-clip: text;" +
            "-webkit-text-stroke-width: 2px;" +
            "-webkit-text-stroke-color: black;";
    };

    // faire apparaitre le niveau
    document.querySelector("#niveau_text").innerHTML = "Voici votre Score : " + (note * difficulte).toString()

    // met le score en or si il est au maximum
    if ((note * difficulte) === 30) {
        document.querySelector("#niveau_text").style = "background: #FFD700; " +
            "-webkit-background-clip: text;" +
            "-webkit-text-fill-color: transparent;" +
            "-webkit-background-clip: text;" +
            "-webkit-text-stroke-width: 2px;" +
            "-webkit-text-stroke-color: black;";
    };

    // pour mettre la bonne couleur de cerveau
    let cerveau_fichier = "";
    let demi_cerveau_couleur = "";

    if (difficulte === 1) {
        cerveau_fichier = "images/cerveau_vert.png";
        demi_cerveau_couleur = "images/demi_cerveau_vert.png";
    } else if (difficulte === 2) {
        cerveau_fichier = "images/cerveau_orange.png";
        demi_cerveau_couleur = "images/demi_cerveau_orange.png";
    } else {
        cerveau_fichier = "images/cerveau_rouge.png";
        demi_cerveau_couleur = "images/demi_cerveau_rouge.png";
    };

    // faire apparaitre les cerveau en fonction de la note et de la difficulte
    let cerveau_complet = Math.trunc((note / 2))

    for (let i = 0; i < cerveau_complet; i++) {
        let id = "#c" + (i + 1).toString()
        document.querySelector(id).style = "visibility: visible;";
        document.querySelector(id).src = cerveau_fichier;
    }

    // pour les demi cerveau
    if (note % 2 === 1) {
        id = "#c" + (cerveau_complet + 1).toString()
        document.querySelector(id).style = "visibility: visible;";
        document.querySelector(id).src = demi_cerveau_couleur;
    }

    // modifier le bouton envoyer qcm par un bouton recommancer
    document.querySelector("#envoie_reponses").innerHTML = '<p  id="envoie_text">Recommancer le QCM</p>';
    document.querySelector("#envoie_reponses").setAttribute("onClick",
        "window.location.reload()");
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GENERATION ENTRAINEMENT
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
script inserant des calculs dans le mode entrainement et vérifie les résultats ainsi que fait certaines animations
*/

// contient le calcul qui doit être effectué
let calcul_entrainement = "";
// contient la réponses au calcul
let reponse_entrainement = "";
// variabble globale pour sauvegarder la difficulte
let difficulte_entrainement = 0

function inserer_calcul(difficulte) {
    /*
    Cette fonction insert un calcul et le stoque avec son résultat pour pouvoir par la suite vérifier
    la réponses de m'utilsateur 
    :param difficulte : la difficulté du calcul 
    */

    difficulte_entrainement = difficulte;

    // récupere un calcul et récuperer sa réponse
    calcul_entrainement = generation_calcul(difficulte);
    reponse_entrainement = eval(calcul_entrainement);
    // insere dans la page le calcul
    document.querySelector("#question").innerHTML = calcul_entrainement;
};

function verifier_calcul() {
    /*
    Cette fonction va récuperer l'entrée de l'utilisateur et va la comparer avec la bonne réponse
    pour ensuite si elle est juste afficher une nouveau calcul
    */

    // récupere l'entrée de l'utilisateur et comparer avec la bonne réponse
    let utilisateur_reponse = document.querySelector("#entre_reponse").value;

    // si la réponse et juste
    if (parseInt(utilisateur_reponse) === reponse_entrainement) {
        // mettre un nouveau calcul
        inserer_calcul(difficulte_entrainement);
        // vider l'entrée
        document.querySelector("#entre_reponse").value = "";
        // remettre la sourie sur l'entrée
        document.querySelector("#entre_reponse").focus();
        // si l'entrée est vide alors considérer que l'utilisateur passe la réponse
    } else if (utilisateur_reponse === "") {
        inserer_calcul(difficulte_entrainement);

        // sinon faire trembler en rouge lentrée de la réponses pour signaer qu'elle est fausse
    } else {

        document.querySelector("#entre_reponse").style.animation = 'none';
        document.querySelector("#entre_reponse").offsetHeight;
        document.querySelector("#entre_reponse").style.animation = null;
        document.querySelector("#entre_reponse").style = "animation: " + "trembler 0.82s cubic-bezier(.36,.07,.19,.97) both;";
        document.querySelector("#entre_reponse").value = "";
        document.querySelector("#entre_reponse").focus();


    };
};

// fonction qui détecte si l'utilisateur à pressé la touche entrée
document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        verifier_calcul();
    };
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// POUR LES JEUX
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// variables pour le jeu
let jeu_demarer = false;
let calcul_jeu;
let reponse_jeu;
let reponse_jeu_index;

// pour la note finale
let bonnes_reponses_jeu = 0;
let mauvaises_reponses_jeu = 0;
let score_jeu = 0;
let nombres_calculs = 0;


/* POUR LE MODE TIME ATTACK */

// variable pour les timers
let temps_restant = 2;
let variable_timer;

function compte_rebours(difficulte, jeu) {
    /*
    Fonction qui fait un compte à rebours avant de démarer le jeu
    :param difficulte : la difficulté du jeu 
    :param jeu : le mode de jeu qui a été selectionné 
    */
    function chrono() {
        /* fonction de chrono principale */
        // afficher le temps restant
        document.querySelector("#temps").innerHTML = temps_restant.toString();

        if (temps_restant === 0) {
            // retirer l'interval de temps
            clearInterval(variable_timer);
            jeu_demarer = true;
            question_calcul_jeu(difficulte, jeu);
            timer_jeu(difficulte, jeu)
        };
        // retirer 1 au temps restant
        temps_restant--;

    };
    // créer une boucle avec un interval de temps
    variable_timer = setInterval(chrono, 1000);

};


function timer_jeu() {
    /*
    fonction qui fait un crono de 60 secondes pour le jeu en mode time attack à la fin des 60 secondes il change la
    variable qui décide si le jeu continue encore
    */

    // mettre le temps restant à 60 secondes
    temps_restant = 60;

    function chrono() {
        /* fonction de chrono principale */
        // afficher le temps restant
        document.querySelector("#temps").innerHTML = temps_restant.toString();


        if (temps_restant === 0) {
            // retirer l'interval de temps
            clearInterval(variable_timer);
            jeu_demarer = false;
            // faire apparaitre les résultats
            afficher_score(difficulte, jeu)
        };
        // retirer 1 au temps restant
        temps_restant--;
    };
    // créer une boucle avec un interval de temps
    variable_timer = setInterval(chrono, 1000);
};


/* POUR LE MODE PLUS GRANDE DISTANCE */

function demarer_distance(difficulte, jeu) {
    /*
    cette fonction sert à démarer le jeu en mode jeu 2 (jeu de la plus grande distance)
    */
    jeu_demarer = true;
    question_calcul_jeu(difficulte, jeu)
};

function jeu2_verifier_reponse(index_reponse, difficulte, jeu) {
    /*
    cette fonction vérifie que la réponses et juste et fait apparaitre une nouvelle question
    */

    // ajouter +1 au nombre de calcul
    nombres_calculs++;

    // faire les opération si et seulement si il reste du temps
    if (jeu_demarer === true) {
        if (index_reponse === reponse_jeu_index) {

            // ajouter le résultat du calcul au score
            score_jeu += reponse_jeu;
            bonnes_reponses_jeu++;

            // faire apparaitre le nouveau score
            document.querySelector("#score").innerHTML = "Score : " + (score_jeu) + " points";

            // mettre une nouvelle question
            question_calcul_jeu(difficulte, jeu);
        } else {
            // stoper le jeu
            jeu_demarer = false;
            // faire trembler l'interface pour indiquer une erreur
            erreur_jeu();
            afficher_score(difficulte, jeu)
        };
    };
};

/*
FONCTION GLOBALES POUR LES JEUX
*/


function question_calcul_jeu(difficulte, jeu) {
    /*
    cette fonction place dans la fenetre un calcul et ses potentieles solutions
    :param difficulte : la difficulte du jeu selectionné
    :param jeu : le mode de jeu qui a été selectionné 
    */

    // si et seulement si le jeu est démarer
    if (jeu_demarer === true) {

    }
    calcul_jeu = generation_calcul(difficulte);
    reponse_jeu = eval(calcul_jeu);

    // insere dans la page le calcul
    document.querySelector("#calcul").innerHTML = calcul_jeu;

    // génération de 3 réponses plausibles
    let reponses_plausibles = [0, 0, 0];

    for (let i = 0; i < 3; i++) {

        // une réponses plausible temporaire
        let plausible_reponse_temp = reponse_jeu + random(-4, 4);

        // vérifier que cette proposition n'a pas déjà été fait ou que ce n'est pas la bonne réponse
        while (plausible_reponse_temp === reponse_jeu ||
            reponses_plausibles.includes(plausible_reponse_temp) ||
            plausible_reponse_temp < 0) {

            // changer la valeur d'une réponse plausible tant qu'elle est égale à la valeur de la réponse
            // et/ou inférieur à 0 et/ou déjà utilisé
            plausible_reponse_temp = reponse_jeu + random(-4, 3);
        };

        // ajouter la réponses plausible tempauraire dans la liste des réponses plausibles
        reponses_plausibles[i] = plausible_reponse_temp;
    };

    // ajouter la bonne réponses dans toutes les réponses et mélanger la liste
    reponses_plausibles.push(reponse_jeu);
    reponses_plausibles = melangeur(reponses_plausibles);

    // récuperation de l'index de la bonne réponse
    reponse_jeu_index = reponses_plausibles.indexOf(reponse_jeu);

    // inserer les réponses dans le qcm et mettre la bonne fonction en fonction du mode de jeu
    if (jeu === 1) {
        for (let i = 0; i < 4; i++) {

            // ajouter les répoinses plausible et la bonne réponses aux boutons dans la fenetre
            document.querySelector("#r" + (i + 1)).innerHTML = reponses_plausibles[i]
            document.querySelector("#r" + (i + 1)).setAttribute("onClick",
                "jeu1_verifier_reponse(" + (i) + "," + (difficulte) + "," + (jeu) + ")");
        };
    } else {
        for (let i = 0; i < 4; i++) {

            // ajouter les réponses plausible et la bonne réponse aux boutons dans la fenetre
            document.querySelector("#r" + (i + 1)).innerHTML = reponses_plausibles[i]
            document.querySelector("#r" + (i + 1)).setAttribute("onClick",
                "jeu2_verifier_reponse(" + (i) + "," + (difficulte) + "," + (jeu) + ")");
        };

    };

};

function jeu1_verifier_reponse(index_reponse, difficulte, jeu) {
    /*
    cette fonction vérifie que la réponses et juste et fait apparaitre une nouvelle question
    */

    // ajouter +1 au nombre de calcul
    nombres_calculs++;

    // faire les opération si et seulement si il reste du temps
    if (jeu_demarer === true) {
        if (index_reponse === reponse_jeu_index) {

            // ajouter le résultat du calcul au score
            score_jeu += reponse_jeu;
            bonnes_reponses_jeu++;

            // faire apparaitre le nouveau score
            document.querySelector("#score").innerHTML = "Score : " + (score_jeu) + " points";

        } else {

            // ajouter 1 aux mauvaise réponses si la réponses est mauvaise
            mauvaises_reponses_jeu++;
            // faire trembler l'interface pour indiquer une erreur
            erreur_jeu();
        };

        // mettre une nouvelle question
        question_calcul_jeu(difficulte, jeu);
    };
};

/* quand la partie est finie */

function erreur_jeu() {
    /*
    si une erreur est faites dans les jeux, faire trembler la fenetre de selection de choix en rouge
    */
    document.querySelector("#reponses_qcm").style.animation = 'none';
    document.querySelector("#reponses_qcm").offsetHeight;
    document.querySelector("#reponses_qcm").style.animation = null;
    document.querySelector("#reponses_qcm").style = "animation: " + "trembler 0.82s cubic-bezier(.36,.07,.19,.97) both;";
    document.querySelector("#reponses_qcm").value = "";
}

function afficher_score(difficulte, jeu) {
    /*
    cette fonction fait disparaitre la fenetre de jeu et fait apparaitre la fenetre des scores
    */
    // cacher la fenetre de jeu
    document.querySelector("#fenetre").style = "display: none;";
    // faire apparaitre la fenetre de résultats
    document.querySelector("#fenetre_score").style = "visibility: visible;";

    /* changer le text dans la fenetre de score */

    // mettre la difficulte sous forme d'un string

    let difficulte_string = ["facile", "moyen", "difficile"][(difficulte - 1)];

    if (jeu === 1) {
        document.querySelector("#score_resultats").innerHTML = "<br>Vous avez réalisé en 60 secondes " +
            (nombres_calculs) + " calcul" + pluriel(nombres_calculs) + " d'une difficulté " +
            (difficulte_string) + " dont " + (bonnes_reponses_jeu) + " réponse" + pluriel(bonnes_reponses_jeu) + " juste" + pluriel(bonnes_reponses_jeu) + " et " + (mauvaises_reponses_jeu) +
            " réponse" + pluriel(mauvaises_reponses_jeu) + " fausse" + pluriel(mauvaises_reponses_jeu) + ", soit un taux de réussite de " + (Math.round(
                (bonnes_reponses_jeu / (mauvaises_reponses_jeu + bonnes_reponses_jeu + 0.0001) * 100)
            )) + " %. <br><br> votre score final est donc de " + (Math.round(
                bonnes_reponses_jeu / (mauvaises_reponses_jeu + bonnes_reponses_jeu + 0.0001) * score_jeu
            ));
    } else {
        document.querySelector("#score_resultats").innerHTML = "<br>Vous avez réalisé " +
            (nombres_calculs) + " calcul" + pluriel(nombres_calculs) + " d'une difficulté " +
            (difficulte_string) + "<br><br> votre score final est donc de " + (score_jeu);
    };

};

function pluriel(valeur) {
    /*
    Cette fonction retroune si il faut placer un s à la fin d'un mot
    */
    if (valeur > 1) {
        return "s";
    };
    return "";
};