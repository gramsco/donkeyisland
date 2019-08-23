class Game {

    constructor(level) {

        //Matrix version of the gameboard
        this.mapJS = [];

        //positions of carrots and shells on the map
        this.carrots = []
        this.shells = []

        //level to implement
        this.level = level;

        //position 
        this.currentID = "00";

        //number of items
        this.numCarrots = 10;
        this.numShells = 0;
        this.totalShells = 0;
        this.lives = 3;
        this.numDrinks = 0;
        this.totalcarrots = 0
        this.carrotsGoal = 15;
    
        //houses
        this.inHouse = false;
        this.inHome = false;
        this.inBar = false;

        //menu
        this.focused = 2;

        //timers 
        this.time = 0;
        // this.lamatimer = 20;
        this.lamatimer = 20;
        this.childtimer = 0;
        this.gametimer = 0;
        this.totalMinutes = 5;
        this.intervalama;

        //music
        this.music = false;

    }

    //Methods

    swapItems(){
        if ((this.currentID == 94 || this.currentID == 95) && this.numShells >= 5){
            this.numShells -= 5;
            this.numDrinks ++;
            return "bar"
        
        } else if ((this.currentID == "00" || this.currentID == "10") && this.numDrinks >= 3){
            this.numDrinks -= 3;
            this.numCarrots ++;
            this.lamatimer = 20;
            return "lama"
        }
        else if ((this.currentID == 89 || this.currentID == 99) && this.numCarrots > 0){
            this.numCarrots --;
            this.carrotsGoal--;
            this.childtimer += 1;
            return "home"
        }
        else {
            return false;
        }
    }

    moveUp() {
        if (this.currentID[0] <= 0) return false;        
        this.mapJS[this.currentID[0]][this.currentID[1]] = this.currentID;
        this.mapJS[this.currentID[0]][this.currentID[1]] = "joker";
        this.currentID = `${(Number(this.currentID[0]) - 1) + this.currentID[1]}`
    }


    moveLeft() {
        if (this.currentID[1] <= 0) return false;
        this.mapJS[this.currentID[0]][this.currentID[1]] = this.currentID;
        this.mapJS[this.currentID[0]][this.currentID[1]] = "joker";
        this.currentID = `${this.currentID[0] + (this.currentID[1] - 1)}`;
    }


    moveRight() {
        
        if (this.currentID[1] >= 9) return false;
        this.mapJS[this.currentID[0]][this.currentID[1]] = this.currentID;
        this.mapJS[this.currentID[0]][this.currentID[1]] = "joker";
        this.currentID = `${this.currentID[0] + (Number(this.currentID[1]) + 1)}`
        return true;
    }

    moveDown() {
        if (this.currentID[0] >= 9) return false;
        this.mapJS[this.currentID[0]][this.currentID[1]] = this.currentID;
        this.mapJS[this.currentID[0]][this.currentID[1]] = "joker";
        this.currentID = `${(Number(this.currentID[0]) + 1) + this.currentID[1]}`
        return true;
    }

    shellsDestroyer(id) {
        for (let i = 0; i < this.shells.length; i++) {
            if (this.shells[i] == id) {
                this.shells.splice(i, 1);
                this.numShells++
                this.mapJS[id[0]][id[1]] == id;
                console.log("hmm")
                console.log(id)
                return true;
            }
        } return false;
    }

    carrotDestroyer(id) {
        for (let i = 0; i < this.carrots.length; i++) {
            if (this.carrots[i] == id) {
                this.carrots.splice(i, 1);
                this.numCarrots++
                this.mapJS[id[0]][id[1]] == id;
                
                return true;
            }
        } return false;
    }

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

            this.gametimer ++

        }, 1000);
    }

    getMinutes() {
        return (5 - this.gametimer / 60)
    }
    getSeconds() {
        return (this.totalMinutes % 60)
    }

    startLama() {
        setTimeout(() => {
            this.intervalama = setInterval(() => {
                this.lamatimer -= 1;
            }, 1000);
        }, 3000);
        
    }

    stopLama(){
        clearInterval(this.intervalama);
        setTimeout(() => {
            startLama()
        }, 2000);
    }

    startSon() {
        this.intervalson = setInterval(() => {
            this.childtimer -= 1;
        }, 1000);
    }

    randomYX() {
        let y = Math.floor(Math.random() * 10)
        let x = Math.floor(Math.random() * 10)
        return "" + y + x;
    }

    createMap() {

        let joker = this.randomYX();
        for (let y = 0; y < 10; y++) {
            let sub_arr = []
            for (let x = 0; x < 10; x++) {
                let valueJS = ("" + y + x)
                if (y == joker[0] && x == joker[1]) {
                    this.currentID = "" + y + x;
                    valueJS = "joker";
                }
                sub_arr.push(valueJS);
            }
            this.mapJS.push(sub_arr);
        }
        return this.currentID;
    }


    // carrots management
    createCarrots(position) {

        if (this.mapJS[position[0]][position[1]] == "shell" || this.mapJS[position[0]][position[1]] != "joker") {
            
            this.mapJS[position[0]][position[1]] = "carrot";
            position = "" + position[0] + position[1];
            this.carrots.push(position);
            this.totalcarrots++;
            return position;
        }
        return false;
    }

    destroyCarrots() {

        if (this.carrots.length > 1) {
            let firstcarrot = this.carrots[0];
            let pos1 = this.carrots[0][1];
            let pos0 = this.carrots[0][0];
            this.mapJS[pos0][pos1] = this.carrots[0];
            this.carrots.shift();
            return firstcarrot;
        }
        return false;
    }

    createShells(position) {
        if (this.mapJS[position[0]][position[1]] != "joker" || this.mapJS[position[0]][position[1]] != "carrot") {
            this.mapJS[position[0]][position[1]] = "shell";
            position = "" + position[0] + position[1];
            this.shells.push(position);
            this.totalShells++;
            return position;
        }
        return false;
    }

    destroyShells() {

        if (this.shells.length > 1) {
            let firstshell = this.shells[0]
            let pos1 = this.shells[0][1]
            let pos0 = this.shells[0][0]
            this.mapJS[pos0][pos1] = this.shells[0];
            this.shells.shift();
            return firstshell;
        }
        return false;
    }



}


