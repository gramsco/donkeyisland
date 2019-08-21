class Game {

    constructor(level) {

        this.mapJS = [];
        this.carrots = []
        this.shells = []
        this.level = level;
        this.time = 0;
        this.currentID = "00";
        this.currentPosition = [0, 0]
        this.numCarots = 0;
        this.lastRandom = []
        this.inHouse = false;
        this.focused = 2;
        this.music = false;
        this.lamatimer = Infinity;
        this.childtimer = Infinity;
        this.intervalama;
        this.numShells = 0;
        this.alcool = 0;
        this.gametimer = 0;
        this.totalMinutes = 5;
        this.inHome = false;
        this.lives = 3;
    }

    //Methods

    check(arg) {

        let num = 0;
        for (let y = 0; y < this.mapJS.length; y++) {
            for (let x = 0; x < this.mapJS.length; x++) {
                if (this.mapJS[y][x] == arg) num++
            }
        }
        return num;
    }

    startTimer() {
        this.intervalama = setInterval(() => {

            this.gametimer += 1

        }, 1000);
    }

    getMinutes() {
        return (5 - this.gametimer / 60)
    }
    getSeconds() {
        return (this.totalMinutes % 60)
    }

    startLama() {
        this.intervalama = setInterval(() => {
            this.lamatimer -= 1;
        }, 1000);
    }

    startSon() {
        this.intervalson = setInterval(() => {
            this.childtimer -= 1;
        }, 1000);
    }

    randomYX() {
        let y = Math.floor(Math.random() * 10)
        let x = Math.floor(Math.random() * 10)
        // return [y_random, x_random]
        return "" + y + x;
    }

    createMap() {

        let joker = this.randomYX();
        for (let y = 0; y < 10; y++) {
            let sub_arr = []
            for (let x = 0; x < 10; x++) {
                let valueJS = ("" + y + x)

                if (y == joker[0] && x == joker[1]) {
                    this.currentPosition[0] = y;
                    this.currentPosition[1] = x;
                    this.currentID = "" + y + x;
                    valueJS = "joker";

                }

                sub_arr.push(valueJS);
            }
            this.mapJS.push(sub_arr);
        }
        return this.currentID;
    }

    win() {

        let bigdom = document.querySelector("body");
        bigdom.innerHTML = ""
        bigdom.style.background = `url("donkey_boat.jpg")`

    }


    // carrots management
    createCarrots(position) {
        this.mapJS[position[0]][position[1]] = "carrot"
        position = "" + position[0] + position[1]
        this.carrots.push(position)
        return position;
    }

    destroyCarrots() {

        let firstcarrot = this.carrots[0]
        let pos1 = this.carrots[0][1]
        let pos0 = this.carrots[0][0]
        this.mapJS[pos0][pos1] = this.carrots[0];
        this.carrots.shift();
        return firstcarrot;
    }

    createShells(position) {
        if (this.mapJS[position[0]][position[1]] != "joker" && this.mapJS[position[0]][position[1]] != "carrot") {
            this.mapJS[position[0]][position[1]] = "shell"
            position = "" + position[0] + position[1]
            this.shells.push(position)
            return position;
        }
        return false;
    }

    // destroyShells() {

    //     let firstcarrot = this.carrots[0]
    //     let pos1 = this.carrots[0][1]
    //     let pos0 = this.carrots[0][0]
    //     this.mapJS[pos0][pos1] = this.carrots[0];
    //     this.carrots.shift();
    //     return firstcarrot;
    // }



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
let home = document.querySelector(".home")
let instructions = document.querySelector('.instruction')
let instru = document.querySelector(".instructionBig")
let spanLamaCarrots = document.getElementById("lamaCarrots")
let divWarning = document.querySelector(".warning")
let img_warning = document.getElementById("img_warning")
let warning = document.getElementById("txt_warning")
let bigContainer = document.querySelector(".bigContainer")
let chrono = 0;
let lamaFill = document.getElementById("lamafill")
let sonFill = document.getElementById("sonfill")
let lamatext = document.getElementById("lamaText")
let sontext = document.getElementById("sonText")
let shells = document.getElementById("numShells")
let numlives = document.getElementById("numLives");


let game = new Game(1);
game.createMap();
game.startTimer();
renderMap();

let music = false;
let music_btn = document.querySelector(".music")
var audio = new Audio('Coralie.wav');
audio.loop = true;

function launch() {

    music = !music;
    audio.volume = 0;

    if (music == true) {
        audio.volume = 1;
        audio.play();
    }


}

// EVENTS
//keyboard
document.addEventListener('keydown', move);
//buttons
// document.addEventListener('click', move)
music_btn.addEventListener('click', launch)
// instructions.addEventListener('mouseenter', appear)
// instructions.addEventListener('mouseleave', appear)


// function appear(e) {

//     instru.classList.toggle('visible')
//     instru.classList.toggle('hidden')
// }





//// LA GESTION DES CAROTTES //// -> to put in method ???


setInterval(() => {
    let newrand = game.randomYX();
    let position = game.createCarrots(newrand);
    let newDiv = document.getElementById(position);
    newDiv.classList.add("carrot");
}, 5000);


// setInterval(() => {

//     let position = game.destroyCarrots();
//     let div_to_kill = document.getElementById(position)
//     div_to_kill.classList.remove("carotte")
// }, 8000)

setInterval(() => {
    let newrand = game.randomYX();
    let position = game.createShells(newrand);
    let newDiv = document.getElementById(position);
    newDiv.classList.add("shell");
}, 20000);


game.startLama()
game.startSon()


//// LA GESTION DES MESSAGES

let intervalID;

let intervalTimeOut;
let intervalTimeOut2;
let n = 0;


// function sendMessage() {

//     let n_person = Math.floor(Math.random() * 2);
//     let n_msg = Math.floor(Math.random() * msgs[n_person].messages.length);

//     if (n_person == 0){
//         lamatext.innerHTML = `${msgs[n_person].messages[n_msg]}`
//     }
//     else{
//         sontext.innerHTML = `${msgs[n_person].messages[n_msg]}`
//     }
//     return true;


// }


// sendMessage()

// function sendMessage() {
//         n++
//         if (n == 1) {
//         let n_person = Math.floor(Math.random() * msgs.length)
//         let n_msg = Math.floor(Math.random() * msgs[n_person].messages.length)
//         bigContainer.classList.toggle("hidden")
//         divWarning.classList.toggle("visible");
//         divWarning.classList.toggle("hidden");
//         warning.innerHTML = `<h1>${msgs[n_person].name}</h1><p>${msgs[n_person].messages[n_msg]}</p>`
//         img_warning.src = `${msgs[n_person].img}`

//         }
//         else{
//             n = 0;
//             clearInterval(intervalTimeOut)
//             clearInterval(intervalTimeOut2)
//             console.log("over")
//         }

//         setTimeout(sendMessage,15000)

// }

setInterval(() => {
    spanCarots.innerHTML = game.numCarots;
    shells.innerHTML = game.numShells;
    lamaFill.style.width = game.lamatimer + "%";
    sonFill.style.width = game.childtimer - "%";
    numlives.innerHTML = "" + game.lives;
    if (game.lamatimer <= 0 || game.childtimer <= 0) losesLife();
    
      
}, 10);


// setInterval(() => {
//     sendMessage();
// },2000)

function losesGame(){
    alert("you fucking lost!!!");
    mapDOM.style.height = 0;
    setTimeout(() => {
        location.reload()
    }, 5000);
}


function losesLife(){
    mapDOM.classList.add('rotate-center')
    game.lives --;
    game.lamatimer += 5;
    game.childtimer += 40;    
    if (game.lives == 0){
        losesGame();
    }
    setTimeout(()=> mapDOM.classList.remove('rotate-center'),1000)
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

let b = 0;

function move(e) {


    b++;
    if (e.key == "ArrowLeft" || e.target == lefty) moveLeft(game);
    if (e.key == "ArrowRight" || e.target == righty) moveRight(game);
    if (e.key == "ArrowUp" || e.target == uppy) moveUp(game);
    if (e.key == "ArrowDown" || e.target == downy) moveDown(game);
    if (e.code == "Space") {


        if (game.focused == 1 && game.numCarots > 0 && game.currentID == "lama") {

            game.numCarots--;
            game.lamatimer++
        }

        if (game.focused == 1 && game.numCarots > 0 && game.currentID == "home") {

            game.numCarots--;
            game.childtimer += 5
        }

    }

    for (let i = 0; i <= game.shells.length; i++) {
        if (game.shells[i] == game.currentID) {
            console.log("you're stepping on shell ground!")
            game.shells.splice(i);
            game.numShells++
        }
    }

    for (let i = 0; i < game.mapJS.length; i++) {
        for (let j = 0; j < game.mapJS.length; j++) {
            if (game.mapJS[i][j] == "shell") {
                document.getElementById("" + i + j).classList.add("shell");
            }
            else {
                document.getElementById("" + i + j).classList.remove("shell");
            }
        }
    }


    for (let i = 0; i <= game.carrots.length; i++) {
        if (game.carrots[i] == game.currentID) {
            console.log("you're stepping on carrot ground")
            game.carrots.splice(i);
            game.numCarots++
        }


        for (let i = 0; i < game.mapJS.length; i++) {
            for (let j = 0; j < game.mapJS.length; j++) {
                if (game.mapJS[i][j] == "carrot") {
                    document.getElementById("" + i + j).classList.add("carrot");
                    spanCarots.innerHTML = game.numCarots;

                }
                else {
                    document.getElementById("" + i + j).classList.remove("carrot");
                    spanCarots.innerHTML = game.numCarots;
                }
            }
        }
    }




    if (game.lamatimer > 100) game.lamatimer = 100;





}

function moveLeft(game) {

    // make sure the currentPosition (array) is equal to the currentID 
    game.currentPosition[0] = game.currentID[0]
    game.currentPosition[1] = game.currentID[1]
    currentElement = document.getElementById(game.currentID)


    if (game.inHouse == true) return false;

    if (game.currentID == 40 || game.currentID == 50) {
        game.mapJS[game.currentPosition[0]][game.currentPosition[1]] == game.currentID;
        currentElement.classList.remove("joker");
        lama.classList.add("selected")
        game.currentID = "lama";
        game.inHouse = true;
        return false;
    }

    if (game.currentID == "home") {

        home.classList.remove("selected");
        game.currentID = "49";
        currentElement = document.getElementById(game.currentID);
        currentElement.classList.add("joker");
        game.inHome = false;
        return false;
    }

    //clears currentPosition
    game.mapJS[game.currentPosition[0]][game.currentPosition[1]] = game.currentID;

    if (game.currentPosition[1] <= 0) return false;

    game.mapJS[game.currentPosition[0]][game.currentPosition[1]] = game.currentID;
    game.currentPosition[1]--;
    game.mapJS[game.currentPosition[0]][game.currentPosition[1]] = "joker";
    currentElement.classList.remove("joker");
    game.currentID = `${game.currentID[0] + (game.currentID[1] - 1)}`;
    currentElement = document.getElementById(game.currentID);
    currentElement.classList.add("joker");




}

function moveRight(e) {

    // makes sure the currentPosition (array) is equal to the currentID 
    game.currentPosition[0] = game.currentID[0]
    game.currentPosition[1] = game.currentID[1]

    //gets the element to change
    currentElement = document.getElementById(game.currentID)

    //checks if it's too much on the right

    if (game.inHome) return false;

    if (game.currentID == 49 || game.currentID == 59) {
        game.mapJS[game.currentPosition[0]][game.currentPosition[1]] == game.currentID;
        currentElement.classList.remove("joker");
        home.classList.add("selected")
        game.currentID = "home";
        game.inHome = true;
        return false;
    }


    if (game.currentID == "lama") {

        lama.classList.remove("selected");

        game.currentID = "40";
        currentElement = document.getElementById(game.currentID);
        currentElement.classList.add("joker");
        game.inHouse = false;
        return false;
    }

    if (game.currentPosition[1] >= 9) return false;


    //clears currentPosition
    game.mapJS[game.currentPosition[0]][game.currentPosition[1]] = game.currentID;

    //updates currentPosition
    game.currentPosition[1] = "" + (Number(game.currentPosition[1]) + 1);

    //updates it on the matrix
    game.mapJS[game.currentPosition[0]][game.currentPosition[1]] = "joker";

    //changes the DOM
    currentElement.classList.toggle("joker");
    game.currentID = `${game.currentID[0] + (Number(game.currentID[1]) + 1)}`
    currentElement = document.getElementById(game.currentID);
    currentElement.classList.add("joker");
}

function moveUp() {


    //gets the element to change
    currentElement = document.getElementById(game.currentID)

    //checks if it can go up
    if (game.inHouse == true || game.inHome == true) {

        if (game.focused > 1) {
            let focused = document.querySelector(".menu.focus");
            let previous = focused.previousElementSibling;
            focused.classList.toggle("focus")
            previous.classList.toggle("focus")
            game.focused--;
        }
        return false;
    }

    if (game.currentPosition[0] <= 0) return false;

    //clears currentPosition
    game.mapJS[game.currentPosition[0]][game.currentPosition[1]] = game.currentID;

    //updates currentPosition
    game.currentPosition[0] = "" + (Number(game.currentPosition[0]) - 1);

    //updates it on the matrix
    game.mapJS[game.currentPosition[0]][game.currentPosition[1]] = "joker";

    //changes the DOM
    currentElement.classList.remove("joker");
    game.currentID = `${(Number(game.currentID[0]) - 1) + game.currentID[1]}`
    currentElement = document.getElementById(game.currentID);
    currentElement.classList.add("joker");
}

function moveDown() {

    // makes sure the currentPosition (array) is equal to the currentID 
    game.currentPosition[0] = game.currentID[0]
    game.currentPosition[1] = game.currentID[1]

    //gets the element to change
    currentElement = document.getElementById(game.currentID)

    //checks if it can go up
    if (game.inHouse == true || game.inHome == true) {

        //checks where we are in the menu
        if (game.focused < 3) {
            let focused = document.querySelector(".menu.focus");
            let previous = focused.nextElementSibling;
            focused.classList.toggle("focus")
            previous.classList.toggle("focus")
            game.focused++;
        }
        return false;
    }
    if (game.currentPosition[0] >= 9) return false;

    //clears currentPosition
    game.mapJS[game.currentPosition[0]][game.currentPosition[1]] = game.currentID;

    //updates currentPosition
    game.currentPosition[0] = "" + (Number(game.currentPosition[0]) + 1);

    //updates it on the matrix
    game.mapJS[game.currentPosition[0]][game.currentPosition[1]] = "joker";

    //changes the DOM
    currentElement.classList.toggle("joker");
    game.currentID = `${(Number(game.currentID[0]) + 1) + game.currentID[1]}`
    currentElement = document.getElementById(game.currentID);
    currentElement.classList.add("joker");
}



setInterval(() => {

    console.table(game.mapJS)
    console.log(`you should have ${game.numCarots} carrots`)

}, 5000);
