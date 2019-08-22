// DOM 
let currentElement;
let playagain = document.getElementById("playagain")

// The map and its parent
let mapDOM = document.querySelector(".container"); // CF line 10
let bigContainer = document.querySelector(".bigContainer")
let main = document.querySelector("main")
let bg = document.querySelector(".bg");
let pressSpace = document.querySelector(".pressSpace");

// The houses
let lama = document.querySelector("#lama")
let home = document.querySelector(".home")
let bar = document.querySelector("#bar")

let str =`<div><i class="fas fa-horse-head"></i></div>`;

// The warnings and instructions
let section = document.querySelector("section")
let introduction = document.querySelector(".introduction")
let arrowRight = document.getElementById("arrowRight")
let arrowLeft = document.getElementById("arrowLeft")
let arrows = document.querySelector(".arrows")
let bouton = document.querySelector(".skipintro")

let instructions = document.querySelector('.instruction')
let instru = document.querySelector(".instructionBig")
let divWarning = document.querySelector(".warning")
let img_warning = document.getElementById("img_warning")
let warning = document.getElementById("txt_warning")
let loselife = document.querySelector(".loseLife")


//The Spans to update
let lamaFill = document.getElementById("lamafill")
// let sonFill = document.getElementById("sonfill")

//Items carried and lives
let spanCarrots = document.getElementById("numCarrots");
let spanShells = document.getElementById("numShells");
let spanDrinks = document.getElementById("numBeers");
let numlives = document.getElementById("numLives");
let carrotsToGo = document.getElementById("carrotsToGo");
let carrotContainer = document.querySelector(".carrotsToGooo");


//menu
let focused = document.querySelector(".menu.focus");

//Messages from left and right
let lamatext = document.getElementById("lamaText")
let sontext = document.getElementById("sonText")
let lamatimer = document.getElementById("lamafill")
let canStart = false;

//Music Manager
let music = true;
let music_btn = document.querySelector(".music")
var musique = new Audio('.././src/coralie.wav');
var carotte = new Audio('.././src/ding.mp3');
var cash = new Audio('.././src/cashing.mp3')
var lose = new Audio('.././src/lose.mp3')
var lamalaugh = new Audio('.././src/lamalaugh.mp3')




function launch() {
    musique.loop = true;
    musique.volume = 1;

    if (music) {
        music = false;
        musique.volume = 0;
        carotte.volume = 0;
        cash.volume = 0;
        lose.volume = 0;
        lamalaugh = 0;
        music_btn.innerHTML = `<i class="fas fa-volume-mute"></i>`
    }
    else {
        music = true;
        musique.volume = 1;
        carotte.volume = 1;
        cash.volume = 1;
        lose.volume = 1;
        lamalaugh.volume = 1;
        music_btn.innerHTML = `<i class="fas fa-volume-up"></i>`
    }
}

//STARTING THE GAME

// We create a new game, object defined at class.js
let game = new Game(1);

//A new map and a starter, we make it appear with renderMap;
let chrono = 0;

let n = 0;



bouton.addEventListener('click', start)
arrowRight.addEventListener('click', () => {
   
    if (n < intro_msgs.length) {
        introduction.innerHTML = intro_msgs[n];
        n++
    }
    else {
        start()
    }
});


function start() {

    document.addEventListener('mouseover',show)

    function show(e){
       
        if (e.target == instructions){
            instru.classList.add("visible");
        }
        else {
            instru.classList.remove("visible");
        }

    }


    main.classList.add("pfiouh")
    // bg.classList.add("blur")
    audio.play();
    section.style.visibility = "hidden";
    main.style.visibility = "visible";
    game.createMap();

    //timers : général, lama, pinatino
    game.startTimer();
    game.startLama()
    // game.startSon()
    renderMap();


    // body.style.visibility = "visible";


    // rendering des timers / objets
    let intervalglobal = setInterval(() => {
        spanCarrots.innerHTML = game.numCarrots + " ";
        spanShells.innerHTML = game.numShells + " ";
        spanDrinks.innerHTML = game.numDrinks + " ";
        carrotsToGo.innerHTML = game.carrotsGoal;
        // lamaFill.innerHTML = game.lamatimer;
        lamaFill.style.width = (5*game.lamatimer) + "%";
        // sonFill.style.width = (10*game.childtimer) + "%";
        if (game.currentID == "00" || game.currentID == "10" || game.currentID == "89" || game.currentID == "99" || game.currentID == "94" || game.currentID == "95") {
            pressSpace.classList.add("bipbip");
            pressSpace.style.visibility = "visible"
        } 
        else{
            pressSpace.classList.remove("bipbip");
            pressSpace.style.visibility = "hidden"
        }
        
        if (game.lamatimer <= 0) {
            game.lamatimer = 25;
            mapDOM.className = "container"
            losesLife();            
        }

        if (game.childtimer >= 15){
            wingame();
        }
        numlives.innerHTML = (str + " ").repeat(game.lives)

    }, 10);

    // EVENTS
    //keyboard
    document.addEventListener('keydown', move);
    
    //buttons
    music_btn.addEventListener('click', launch)

    //swipe... stay put...


    // SHELLS MANAGEMENT
    setInterval(() => {
        let newrand = game.randomYX();
        if (newrand == "00" || newrand == "10" || newrand == "94" || newrand == "95"  || newrand == "89" || newrand == "99"){
            return false;
        }
        else {
            let position = game.createShells(newrand);
            if (position) {
            let newDiv = document.getElementById(position);
            newDiv.classList.add("shell");
        }
    }
        return false;
    }, 800);

    setInterval(() => {

        let position = game.destroyShells();
        if (position) {
            let div_to_kill = document.getElementById(position)
            div_to_kill.classList.remove("shell")
        }
    }, 6000)

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

    function wingame(){
        clearInterval(intervalglobal)
        bg.classList.add("unblur")
        bg.classList.remove('blur')
        audio.volume = 0;
        introduction.innerHTML = `<h1>YOU SAVED THE DAY !</h1><p>Enjoy the view.</p>`
        introduction.style.visibility = "visible";
        introduction.classList.add("reverse-pfiouh")
        main.style.visibility = "hidden";
        section.style.visibility = "hidden";
        pressSpace.style.visibility = "hidden";
        setTimeout(() => {
            location.reload();
        }, 25000);
    }

    function losesGame() {
        clearInterval(intervalglobal)
        audio.volume = 0;
        introduction.innerHTML = `<h1>YOU LOST !</h1><p>Your son Piñatino will probably eat you.</p>`
        introduction.classList.add("reverse-pfiouh")
        introduction.style.visibility = "visible";
        main.style.visibility = "hidden";
        bg.classList.remove('blur');
        bg.style.backgroundImage = `url("./img/bonnet-ane-capirote.jpg")`
        
        setTimeout(() => {
            playagain.classList.add("pfiouh")
            playagain.style.visibility = "visible";

        }, 8000);
        
        setTimeout(() => {
            location.reload();
        }, 13000);

    }

    

    function losesLife() {
       
        game.lives--;
        lose.play();
        bigContainer.classList.add("blur")
        mapDOM.classList.add('rotate-center')
        loselife.style.visibility = "visible"

        if (game.lives == 0) {
            losesGame();
            
        }
        setTimeout(() => {
            bigContainer.classList.remove("blur");
            mapDOM.classList.remove('rotate-center');
            loselife.style.visibility = "hidden";
        }, 1000);    
        
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
            let swap = game.swapItems();
            if (swap == "bar"){
                cash.play()
            }
            else if (swap == "lama"){
                lamalaugh.play()
            }
            else if (swap == "home"){
                carotte.play();
                carrotContainer.style.visibility = "visible";
                setTimeout(() => {
                    carrotContainer.style.visibility = "hidden"
                }, 2000);
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
            lama.classList.add("selected")
            lama.classList.remove("joker")
        } else if (result == "home") {
            home.classList.remove("joker")
            home.classList.remove("selected")
        }

        //updates the DOM
        currentElement = document.getElementById(game.currentID);
        currentElement.classList.toggle("joker");

    }


    function moveRight(e) {
        console.log(game.currentID)
        let currentElement = document.getElementById(game.currentID)
        currentElement.classList.remove("joker");

        //updates the JS 
        let result = game.moveRight()

        //then changes it to DOM
        if (result == "home") {
            home.classList.add("selected")
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

        
        if (result == "bar") {
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
            bar.classList.add("selected")
        }

        //add the donkey on the DOM
        currentElement = document.getElementById(game.currentID);
        currentElement.classList.add("joker");
        currentElement.classList.remove("carrot");
    }











}
