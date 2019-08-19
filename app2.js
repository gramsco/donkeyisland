class Game {

    constructor(level) {

        this.mapJS = [];
        this.carrots = []
        this.newthing = []
        this.level = level;
        this.time = 0;
        this.currentID = "00";
        this.currentPosition =[0,0]
        this.numCarots = 0;
        this.lastRandom = []
        this.inHouse = false;
        this.focused = 2;
        this.music = false;
        this.lamaCarots = 0;

    }

    //Methods

    randomYX() {
        let y = Math.floor(Math.random() * 10)
        let x = Math.floor(Math.random() * 10)
        // return [y_random, x_random]
        return "" + y + x;


    }

    createMap() {

        let joker = this.randomYX;

        for (let y = 0; y < 10; y++) {

            let sub_arr = []
            for (let x = 0; x < 10; x++) {

                let valueJS = ("" + y + x)

                if (y == joker[0] && x == joker[1]) {

                    this.currentPosition[0] = y;
                    this.currentPosition[1] = x;
                    valueJS = "joker"
                }

                sub_arr.push(valueJS)
            }
            this.mapJS.push(sub_arr);
        }
        return this.mapJS;
    }

    win() {

        let bigdom = document.querySelector("body");
        bigdom.innerHTML = ""
        bigdom.style.background = `url("donkey_boat.jpg")`

    }


    // carrots management
    createCarrots(position) {
        this.mapJS[position[0]][position[1]] = "carotte"
        position = "" + position[0] + position[1]
        this.carrots.push(position)
        console.table(this.carrots)
        return position;
    }

    destroyCarrots() {
        let carrots = this.carrots
        let firstcarrot = carrots[0]
        carrots.shift();
        return firstcarrot;
    }

}


// DOM 
let currentElement;
let mapDOM = document.querySelector(".container"); // CF line 10
let lefty = document.getElementById("lefty");
let uppy = document.getElementById("uppy");
let righty = document.getElementById("righty");
let downy = document.getElementById("downy");
let spanCarots = document.getElementById("numCarots");
let lama = document.querySelector(".lama")
let instructions = document.querySelector('.instruction')
let instru = document.querySelector(".instructionBig")
let spanLamaCarrots = document.getElementById("lamaCarrots")


let game = new Game(1);
game.createMap();
game.currentID = game.randomYX();
renderMap();

let music = false;
let music_btn = document.querySelector(".music")
var audio = new Audio('Coralie.wav');
audio.loop = true;

function launch(){

    music = !music;
    audio.volume = 0;
    
    if (music == true){
        audio.volume = 1;
        audio.play();
    }
    

}

// EVENTS
//keyboard
document.addEventListener('keydown', move)
//buttons
document.addEventListener('click', move)
music_btn.addEventListener('click',launch)
instructions.addEventListener('mouseenter',blob)
instructions.addEventListener('mouseleave',blob)


function blob(e){
     
    console.log(instru)
    instru.classList.toggle('visible')
    instru.classList.toggle('hidden')
}





//// LA GESTION DES CAROTTES //// -> to put in method ???


setInterval(() => {
    let newrand = game.randomYX();
    let position = game.createCarrots(newrand);
    let newDiv = document.getElementById(position);
    newDiv.classList.add("carotte");
}, 4000);


setInterval(() => {
    
    let position = game.destroyCarrots();
    let div_to_kill = document.getElementById(position)
    div_to_kill.classList.remove("carotte")
}, 6000)


function renderMap(){

    for (let y = 0; y < game.mapJS.length ; y++){
        
        for (let x = 0; x < game.mapJS.length ; x ++){
            let newdiv = document.createElement("div")
            let id = "" + y + x;
            if (id == game.currentID){
                newdiv.classList.add("joker");
            }
            newdiv.id = id;
            mapDOM.appendChild(newdiv);
        }
    }
}

function move(e){
    
    if (e.key == "ArrowLeft" || e.target == lefty) moveLeft(game);
    if (e.key == "ArrowRight" || e.target == righty) moveRight(game);
    if (e.key == "ArrowUp" || e.target == uppy) moveUp(game);
    if (e.key == "ArrowDown" || e.target == downy) moveDown(game);
    if (e.code == "Space") {


        if (game.focused == 1 && game.numCarots > 0 && game.currentID=="lama"){
        
        game.numCarots--;
        game.lamaCarots ++
        }

    }

    for (let i = 0 ; i < game.carrots.length ; i++){
        if (game.carrots[i] == game.currentID) {
            console.log("target acquired")
            let carrot_to_remove = document.getElementById(game.currentID);
            carrot_to_remove.classList.remove("carotte");
            game.numCarots++
        }
    }
    spanLamaCarrots.innerHTML = game.lamaCarots;
    spanCarots.innerHTML = game.numCarots;
}

function moveLeft(game){
   
    // make sure the currentPosition (array) is equal to the currentID 
    game.currentPosition[0] = game.currentID[0] 
    game.currentPosition[1] = game.currentID[1] 
    currentElement = document.getElementById(game.currentID)

    console.log(game.currentPosition)

    if (game.inHouse == true) return false;
    if (game.currentID == 40 || game.currentID == 50){
        console.log("should go the lama")
        game.mapJS[game.currentPosition[0]][game.currentPosition[1]] == game.currentID;
        currentElement.classList.remove("joker");
        lama.classList.add("selected")
        lama.style.backgroundImage += `url("Donkey.gif),url("lama.jpg"),`
        game.currentID = "lama";
        game.inHouse = true;
        return false;
    }
    if (game.currentPosition[1] <= 0) return false;
    game.mapJS[game.currentPosition[1]][game.currentPosition[0]] = null;
    game.currentPosition[1]--;
    game.mapJS[game.currentPosition[1]][game.currentPosition[0]] = "joker";
    currentElement.classList.remove("joker");
    game.currentID = `${game.currentID[0] + (game.currentID[1] - 1)}`;
    currentElement = document.getElementById(game.currentID);
    currentElement.classList.add("joker");
}

function moveRight(e){

    // makes sure the currentPosition (array) is equal to the currentID 
    game.currentPosition[0] = game.currentID[0] 
    game.currentPosition[1] = game.currentID[1] 

    //gets the element to change
    currentElement = document.getElementById(game.currentID)

    //checks if it's too much on the right
    
    if (game.currentPosition[1] >= 9) return false;
    if (game.currentID == "lama") {

        lama.classList.remove("selected");
        lama.style.backgroundImage = `url(lama.jpg)`
    
        game.currentID = "40";
        currentElement = document.getElementById(game.currentID);
        currentElement.classList.add("joker");
        game.inHouse = false;
        return false;
    }

    //updates currentPosition
    game.currentPosition[1] = ""+(Number(game.currentPosition[1])+1);

    //updates it on the matrix
    game.mapJS[game.currentPosition[1]][game.currentPosition[0]] = "joker";

    //changes the DOM
    currentElement.classList.toggle("joker");
    game.currentID = `${game.currentID[0]+(Number(game.currentID[1])+1)}`
    currentElement = document.getElementById(game.currentID);
    currentElement.classList.add("joker");
}

function moveUp(){

    // makes sure the currentPosition (array) is equal to the currentID 
    game.currentPosition[0] = game.currentID[0] 
    game.currentPosition[1] = game.currentID[1] 

    //gets the element to change
    currentElement = document.getElementById(game.currentID)

    //checks if it can go up
    if (game.inHouse == true){

        if (game.focused > 1){
        let focused = document.querySelector(".menu.focus");
        let previous = focused.previousElementSibling;
        focused.classList.toggle("focus")
        previous.classList.toggle("focus")
        game.focused --;
        }
        return false;
    }

    if (game.currentPosition[0] <= 0) return false;

    //updates currentPosition
    game.currentPosition[0] = ""+(Number(game.currentPosition[0])-1);

    //updates it on the matrix
    game.mapJS[game.currentPosition[1]][game.currentPosition[0]] = "joker";

    //changes the DOM
    currentElement.classList.toggle("joker");
    game.currentID = `${(Number(game.currentID[0])-1)+game.currentID[1]}`
    console.log(game.currentID)
    currentElement = document.getElementById(game.currentID);
    currentElement.classList.add("joker");
}

function moveDown(){

    // makes sure the currentPosition (array) is equal to the currentID 
    game.currentPosition[0] = game.currentID[0] 
    game.currentPosition[1] = game.currentID[1] 

    //gets the element to change
    currentElement = document.getElementById(game.currentID)

    //checks if it can go up
    if (game.inHouse == true){

        //checks where we are in the menu
        if (game.focused < 3 ){
        let focused = document.querySelector(".menu.focus");
        let previous = focused.nextElementSibling;
        focused.classList.toggle("focus")
        previous.classList.toggle("focus")
        game.focused ++;
        }
        return false;
    }
    if (game.currentPosition[0] >= 9) return false;

    //updates currentPosition
    game.currentPosition[0] = ""+(Number(game.currentPosition[0])+1);

    //updates it on the matrix
    game.mapJS[game.currentPosition[0]][game.currentPosition[1]] = "joker";

    //changes the DOM
    currentElement.classList.toggle("joker");
    game.currentID = `${(Number(game.currentID[0])+1)+game.currentID[1]}`
    console.log(game.currentID)
    currentElement = document.getElementById(game.currentID);
    currentElement.classList.add("joker");
}