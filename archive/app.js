// //The div containing the map
// let currentPosition = [0,0]
// let currentID;
// let currentElement;
// let mapDOM = document.querySelector(".container");
// let mapJS;
// let lefty = document.getElementById("lefty");
// let uppy = document.getElementById("uppy");
// let righty = document.getElementById("righty");
// let downy = document.getElementById("downy");
// let numCarots = 0;
// let spanCarots = document.getElementById("numCarots");



// setTimeout(() => {
    
//     mapJS = createMap();

// },1);


// // with keyboard
// document.addEventListener('keydown',move)

// //without
// document.addEventListener('click',move)



// let value;


// //// LA GESTION DES CAROTTES ////
// let carrots = []

// setInterval(createCarott,8000)


// setInterval(() => {
//     let carotte = carrots[0]
//     console.table(carrots)
//     let to_kill = document.getElementById(carotte);
//     to_kill.classList.remove("carotte")
//     carrots.shift();
// }
//     ,12000)
// //



// // setTimeout(win,3000);


// function win(){

//     let bigdom = document.querySelector("body");
//     bigdom.innerHTML = ""
//     bigdom.style.background = `url("donkey_boat.jpg")`

// }



// function createCarott(){
//     let position = randomYX();
//     mapJS[position[0]][position[1]] = "carotte"
//     position = ""+position[0]+position[1]
//     carrots.push(position)
//     let positionDom = document.getElementById(position)
//     positionDom.classList.toggle("carotte")
//     console.table(carrots)
    
// }



// // returns an array with an Y and an X
// function randomYX() {

//     let y_random = Math.floor(Math.random() * 10)
//     let x_random = Math.floor(Math.random() * 10)
//     return [y_random, x_random]
// }

// //creates a new map
// function createMap(){


//     let newMap = []
//     let joker = randomYX();

//     for (let y = 0; y < 10; y++) {

//         let sub_arr = []
//         for (let x = 0; x < 10; x++){
    
//             let newDiv = document.createElement('div')
//             let valueJS = (""+y+x)
            
//             if (y == joker[0] && x == joker[1]) {
                
//                 newDiv.className = "joker"
//                 currentPosition[0] = y;
//                 currentPosition[1] = x;
//                 valueJS = "joker"
//             }
//             sub_arr.push(valueJS)
//             newDiv.id = (""+y+x);
//             mapDOM.appendChild(newDiv)
//         }
//         newMap.push(sub_arr);
    
//     }
//     return newMap;
// }

// function move(e){
//     // console.log(e)
//     currentElement = document.querySelector(".joker");
//     currentID = document.querySelector(".joker").id
//     if (e.key == "ArrowRight" || e.target == righty) moveRight(e);
//     if (e.key == "ArrowLeft" || e.target == lefty) moveLeft(e);
//     if (e.key == "ArrowUp" || e.target == uppy ) moveUp();
//     if (e.key == "ArrowDown" || e.target == downy) moveDown();
//     if (e.code == "Space") {
//     }

//     for (let i = 0 ; i < carrots.length ; i++){
//         if (carrots[i] == currentID) {

//             let carrot_to_remove = document.getElementById(currentID);
//             carrot_to_remove.classList.remove("carotte");
//             numCarots++

//         }
//     }
//     spanCarots.innerHTML = numCarots;
    
// }

// function moveLeft(){

//     if (currentPosition[1] <= 0) return false;

//     mapJS[currentPosition[1]][currentPosition[0]] = null;
//     currentPosition[1]--;
//     mapJS[currentPosition[1]][currentPosition[0]] = "joker";

//     currentElement.classList.remove("joker");
//     currentID =`${currentID[0]+(currentID[1]-1)}`
//     currentElement = document.getElementById(currentID);
//     currentElement.classList.add("joker");
    
// }

// function moveRight(e){
   
//     if (currentPosition[1] >= 9) return false;

//     mapJS[currentPosition[1]][currentPosition[0]] = null;
//     currentPosition[1]++;
//     mapJS[currentPosition[1]][currentPosition[0]] = "joker";

//     currentElement.classList.remove("joker");
//     currentID = `${currentID[0]+(Number(currentID[1])+1)}`
//     currentElement = document.getElementById(currentID);
//     currentElement.classList.add("joker");
//     console.log(`move right: ${currentID}`)
// }

// function moveUp(){

//     if (currentPosition[0] <= 0) return false;
//     mapJS[currentPosition[1]][currentPosition[0]] = null;
//     currentPosition[0]--;
//     mapJS[currentPosition[1]][currentPosition[0]] = "joker";
//     currentElement.classList.remove("joker");
//     currentID = `${(currentID[0]-1)+currentID[1]}`
//     currentElement = document.getElementById(currentID);
//     currentElement.classList.add("joker");
// }
// function moveDown(){

//     if (currentPosition[0] >= 9) return false;

//     mapJS[currentPosition[1]][currentPosition[0]] = null;
//     currentPosition[0]++;
//     mapJS[currentPosition[1]][currentPosition[0]] = "joker";

//     currentElement.classList.remove("joker");
//     console.log(currentID)
//     currentID = (`${Number(currentID)+10}`)
//     currentElement = document.getElementById(currentID);
    
//     currentElement.classList.add("joker");
//     console.log(`movedown : ${currentID}`)

// }









