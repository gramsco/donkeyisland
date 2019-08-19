function generateMatrix(size,name="joker"){
    let num = size;
    let arr = []
    let jokeX = Math.floor(Math.random() * size)
    let jokeY = Math.floor(Math.random() * size)
    for (let y = 0 ; y < num ; y ++){
        let newArr = [];
        for (let x = 0; x < num ; x ++){
            newArr.push(jokeX == x && jokeY == y ? name:"0");
        }
        arr.push(newArr);
    }
    return arr;
}

let name = "Antonin"
arr2 = generateMatrix(10,name)

console.log(arr2)



function space(){

    console.log('space!')
    let elu = document.querySelector(".joker")
    if (x % 2 == 0) elu.style.background = "red"
    

}

function move(e){
    // console.log(e)

    if (e.key == "ArrowRight") moveRight(e);
    if (e.key == "ArrowLeft") moveLeft(e);
    if (e.key == "ArrowUp") moveUp();
    if (e.key == "ArrowDown") moveDown();
    if (e.code == "Space") {
        // setInterval(space,1)
        space();

    }
    mapRender();
    
}






function moveLeft(e){

    if (x <= 0) return false;
    arr[y][x] = null;
    x-- ;
    arr[y][x] = "neo";

}
function moveRight(e){
   
    if (x >= arr.length-1) return false;
    arr[y][x] = null;
    x++ ;
    arr[y][x] = "neo";

}

function moveUp(){

    if (y <= 0) return false;
    arr[y][x] = null;
    y-- ;
    arr[y][x] = "neo";

}
function moveDown(){

    if (y >= arr.length-1) return false;
    arr[y][x] = null;
    y++ ;
    arr[y][x] = "neo";

}

var test = addEventListener('keydown',move)
