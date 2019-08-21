// DOM 
let currentElement;

// The map and its parent
let mapDOM = document.querySelector(".container"); // CF line 10
let bigContainer = document.querySelector(".bigContainer")
let main = document.querySelector("main")

// The houses
let lama = document.querySelector(".lama")
let home = document.querySelector(".home")
let bar = document.querySelector("#bar")

// The warnings and instructions
let introduction = document.querySelector(".introduction")
let bouton = document.querySelector(".skipintro")
// let instructions = document.querySelector('.instruction')
let instru = document.querySelector(".instructionBig")
let divWarning = document.querySelector(".warning")
let img_warning = document.getElementById("img_warning")
let warning = document.getElementById("txt_warning")

//The Spans to update
let lamaFill = document.getElementById("lamafill")
let sonFill = document.getElementById("sonfill")

//Items carried and lives
let spanCarrots = document.getElementById("numCarrots");
let spanShells = document.getElementById("numShells")
let spanDrinks = document.getElementById("numBeers")
let numlives = document.getElementById("numLives");


//menu
let focused = document.querySelector(".menu.focus");

//Messages from left and right
let lamatext = document.getElementById("lamaText")
let sontext = document.getElementById("sonText")
let lamatimer = document.getElementById("lamafill")
let canStart = false;

//Music Manager
let music = false;
let music_btn = document.querySelector(".music")
var audio = new Audio('/sounds/Coralie.wav');
audio.loop = true;

function launch() {

    music = !music;
    audio.volume = 0;

    if (music == true) {
        audio.volume = 1;
        audio.play();
    }
}

//STARTING THE GAME

// We create a new game, object defined at class.js
let game = new Game(1);

//A new map and a starter, we make it appear with renderMap;
let chrono = 0;

let n = 0;

bouton.addEventListener('click', start)

introduction.addEventListener('click', () => {

    if (n < intro_msgs.length) {
        introduction.innerHTML = intro_msgs[n];
        n++
    }
    else {
        start()
    }
});


function start() {
    introduction.style.visibility = "hidden";
    main.style.visibility = "visible";
    game.createMap();

    //timers : général, lama, pinatino
    game.startTimer();
    game.startLama()
    game.startSon()
    renderMap();


    // body.style.visibility = "visible";


    // rendering des timers / objets
    setInterval(() => {
        spanCarrots.innerHTML = game.numCarrots;
        spanShells.innerHTML = game.numShells;
        spanDrinks.innerHTML = game.numDrinks;
        lamaFill.innerHTML = game.lamatimer + "%";
        lamaFill.style.width = game.lamatimer + "%";
        if (game.lamatimer > 100) game.lamatimer = 100;

    }, 10);

    // EVENTS
    //keyboard
    document.addEventListener('keydown', move);

    //buttons
    music_btn.addEventListener('click', launch)

    //swipe... stay put.




    //// LA GESTION DES CAROTTES //// -> to put in method ???
    setInterval(() => {
        let newrand = game.randomYX();
        let position = game.createCarrots(newrand);
        if (position) {
            let newDiv = document.getElementById(position);
            newDiv.classList.add("carrot");
        }
    }, 800);

    setInterval(() => {

        let position = game.destroyCarrots();
        if (position) {
            let div_to_kill = document.getElementById(position)
            div_to_kill.classList.remove("carrot")
        }
    }, 3000)

    // SHELLS MANAGEMENT
    setInterval(() => {
        let newrand = game.randomYX();
        let position = game.createShells(newrand);
        if (position) {
            let newDiv = document.getElementById(position);
            newDiv.classList.add("shell");
        }
        return false;
    }, 10000);

    setInterval(() => {

        let position = game.destroyShells();
        if (position) {
            let div_to_kill = document.getElementById(position)
            div_to_kill.classList.remove("shell")
        }
    }, 12000)

    //// LA GESTION DES MESSAGES

    // en dessous d'un certain %age, warnings, sinon messages marrants ? 
    // setInterval(() => {
    //     let n_person = Math.floor(Math.random() * 2);
    //     let n_msg = Math.floor(Math.random() * msgs[n_person].messages.length);

    //     if (n_person == 0){
    //         lamatext.innerHTML = `${msgs[n_person].messages[n_msg]}`
    //     }
    //     else{
    //         sontext.innerHTML = `${msgs[n_person].messages[n_msg]}`
    //     }
    //     return true;
    // },2000)

    function losesGame() {
        alert("you fucking lost!!!");
        mapDOM.style.height = 0;
        setTimeout(() => {
            location.reload()
        }, 5000);
    }


    function losesLife() {
        mapDOM.classList.add('rotate-center')
        game.lives--;
        game.lamatimer += 5;
        game.childtimer += 40;
        if (game.lives == 0) {
            losesGame();
        }
        setTimeout(() => mapDOM.classList.remove('rotate-center'), 1000)
    }


    function renderMap() {
        for (let y = 0; y < game.mapJS.length; y++) {
            for (let x = 0; x < game.mapJS.length; x++) {
                let newdiv = document.createElement("div")
                let id = "" + y + x;
                if (id == game.currentID) {
                    newdiv.classList.add("joker");
                }
                newdiv.id = id;
                mapDOM.appendChild(newdiv);
            }
        }
    }

    //////////////////////////////////// DEPLACEMENTS ///////////////////////////////////

    // let b = 0; (count the number of moves ???) wtf

    function move(e) {


        // b++;
        if (e.key == "ArrowLeft" || e.key == "q") moveLeft(game);
        if (e.key == "ArrowRight" || e.key == "d") moveRight(game);
        if (e.key == "ArrowUp" || e.key == "z") moveUp(game);
        if (e.key == "ArrowDown" || e.key == "s") moveDown(game);
        if (e.code == "Space") {

            // Unload 
            // Lama
            if (game.focused == 1 && game.numCarrots > 0 && game.currentID == "lama") {
                game.numCarrots--;
                game.lamatimer++;
            }
            else if (game.focused == 2 && game.numCarrots > 0 && game.currentID == "lama") {
                game.numDrinks--;
                game.lamatimer = 100;
            }
            // Home
            if (game.focused == 1 && game.numCarrots > 0 && game.currentID == "home") {
                game.numCarrots--;
                game.childtimer += 5;
            }
            else if (game.focused == 2 && game.numDrinks > 0 && game.currentID == "home") {
                game.numDrinks--;
                losesLife();
                alert("Alcool to a child? Dude.")
            }
            // Bar
            if (game.focused == 2 && game.numShells >= 5 && game.currentID == "bar") {
                game.numShells -= 5;
                game.numDrinks++;
            }
        }

        if (game.carrotDestroyer(game.currentID)) {
            document.getElementById(game.currentID).classList.remove("carrot");
        }

        if (game.shellsDestroyer(game.currentID)) {
            document.getElementById(game.currentID).classList.remove("shell")
        }



    }

    function moveLeft(game) {

        // make sure the currentPosition (array) is equal to the currentID 

        let currentElement = document.getElementById(game.currentID)
        currentElement.classList.remove("joker");

        // First update the JS
        let result = game.moveLeft();

        if (result == "lama") {
            lama.classList.add("joker")
        } else if (result == "home") {
            home.classList.remove("joker")
            home.classList.remove("selected")
        }

        //updates the DOM
        currentElement = document.getElementById(game.currentID);
        currentElement.classList.add("joker");

    }


    function moveRight(e) {
        let currentElement = document.getElementById(game.currentID)
        currentElement.classList.remove("joker");

        //updates the JS 
        let result = game.moveRight()

        //then changes it to DOM
        if (result == "home") {
            home.classList.add("selected")
            home.classList.add("joker")
        } else if (result == "lama") {
            lama.classList.remove("selected");
            lama.classList.remove("joker")
        }

        currentElement = document.getElementById(game.currentID);
        currentElement.classList.add("joker");
        currentElement.classList.remove("carrot");


    }

    function moveUp() {
        //removes the donkey
        currentElement = document.getElementById(game.currentID)
        currentElement.classList.remove("joker");

        //checks if it can go up
        let result = game.moveUp();

        if (result == "menu") {
            let previous = focused.previousElementSibling;
            focused.classList.toggle("focus");
            previous.classList.toggle("focus");
        }
        else if (result == "bar") {
            bar.classList.remove("joker");
            bar.classList.remove("selected");
        }

        //add the donkey on the DOM
        currentElement = document.getElementById(game.currentID);
        currentElement.classList.add("joker");
        currentElement.classList.remove("carrot");
    }

    function moveDown() {

        //removes the donkey
        currentElement = document.getElementById(game.currentID)
        currentElement.classList.remove("joker");

        //checks if it can go down
        let result = game.moveDown();
        if (result == "bar") {
            bar.innerHTML.classList.add("selected")
            bar.innerHTML.classList.add("joker")
        }

        //add the donkey on the DOM
        currentElement = document.getElementById(game.currentID);
        currentElement.classList.add("joker");
        currentElement.classList.remove("carrot");
    }


    // functions to check if things go right

    // setInterval(() => {

    //     console.log((game.totalcarrots/game.gametimer).toFixed(2) > 1);


    // },1000)








}
