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
        this.currentPosition = [0, 0]

        //number of items
        this.numCarots = 0;
        this.numShells = 0;
        this.lives = 3;
        this.numDrinks = 5;

        //houses
        this.inHouse = false;
        this.inHome = false;
        this.inBar = false;

        //menu
        this.focused = 2;

        //timers 
        this.time = 0;
        this.lamatimer = 100;
        this.childtimer = 100;
        this.gametimer = 0;
        this.totalMinutes = 5;
        this.intervalama;

        //music
        this.music = false;

    }

    //Methods

    moveUp() {

        if (this.inHouse == true || this.inHome == true) {
            if (this.focused > 1) this.focused--;
            return "menu";
        }

        if (this.inBar == true) {
            "you were in the bar!"
            this.currentID = "94";
            this.inBar = false;
            return "bar";
        }

        if (this.currentPosition[0] <= 0) return false;
        
        this.mapJS[this.currentPosition[0]][this.currentPosition[1]] = this.currentID;
        this.currentPosition[0] = "" + (Number(this.currentPosition[0]) - 1);
        this.mapJS[this.currentPosition[0]][this.currentPosition[1]] = "joker";
        this.currentID = `${(Number(this.currentID[0]) - 1) + this.currentID[1]}`
    }


    moveLeft() {
        if (this.inHouse == true) return false;
        if (this.currentID == 40 || this.currentID == 50) {
            this.mapJS[this.currentPosition[0]][this.currentPosition[1]] = this.currentID;
            alert(`entered from ${this.currentID}`)
            this.currentID = "lama";
            this.inHouse = true;
            return "lama";
        }
        if (this.currentID == "home") {
            this.currentID = "49";
            this.mapJS[this.currentPosition[0]][this.currentPosition[1]] = this.currentID;
            this.inHome = false;
            return "home";
        }
        if (this.currentPosition[1] <= 0) return false;
        this.mapJS[this.currentPosition[0]][this.currentPosition[1]] = this.currentID;
        this.currentPosition[1]--;
        this.mapJS[this.currentPosition[0]][this.currentPosition[1]] = "joker";
        this.currentID = `${this.currentID[0] + (this.currentID[1] - 1)}`;
    }


    moveRight() {
        if (this.inHome) return false;
        if (this.currentID == 49 || this.currentID == 59) {
            this.mapJS[this.currentPosition[0]][this.currentPosition[1]] = this.currentID;
            this.currentID = "home";
            this.inHome = true;
            return "home"
        }
        if (this.inHouse == true) {
            this.currentID = "40";
            this.inHouse = false;
            this.mapJS[this.currentPosition[0]][this.currentPosition[1]] = this.currentID;
            
            return "lama"
        }

        if (this.currentPosition[1] >= 9) return false;

        this.mapJS[this.currentPosition[0]][this.currentPosition[1]] = this.currentID;
        this.currentPosition[1] = "" + (Number(this.currentPosition[1]) + 1);
        this.mapJS[this.currentPosition[0]][this.currentPosition[1]] = "joker";
        this.currentID = `${this.currentID[0] + (Number(this.currentID[1]) + 1)}`
        return true;
    }

    moveDown() {
        if (this.inBar) return false;

        if (this.currentID == 94 || this.currentID == 95) {
            this.mapJS[this.currentPosition[0]][this.currentPosition[1]] == this.currentID;
            this.currentID = "bar";
            this.inBar = true;
            return "home"
        }
        if (this.inHouse == true || this.inHome == true) {

            //checks where we are in the menu
            if (this.focused < 3) {
                let focused = document.querySelector(".menu.focus");
                let previous = focused.nextElementSibling;
                focused.classList.toggle("focus")
                previous.classList.toggle("focus")
                this.focused++;
            }
            return false;
        }

        if (this.currentPosition[0] >= 9) return false;
        this.mapJS[this.currentPosition[0]][this.currentPosition[1]] = this.currentID;
        this.currentPosition[0] = "" + (Number(this.currentPosition[0]) + 1);
        this.mapJS[this.currentPosition[0]][this.currentPosition[1]] = "joker";
        this.currentID = `${(Number(this.currentID[0]) + 1) + this.currentID[1]}`
        return true;

    }

    shellsDestroyer(id) {
        for (let i = 0; i < this.shells.length; i++) {
            if (this.shells[i] == id) {
                this.shells.splice(i, 1);
                this.numShells++
                this.mapJS[id[0]][id[1]] == id;
                return true;
            }
        } return false;
    }

    carrotDestroyer(id) {
        for (let i = 0; i < this.carrots.length; i++) {
            if (this.carrots[i] == id) {
                this.carrots.splice(i, 1);
                this.numCarots++
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

        if (this.mapJS[position[0]][position[1]] == "shell" || this.mapJS[position[0]][position[1]] != "joker") {

            this.mapJS[position[0]][position[1]] = "carrot"
            position = "" + position[0] + position[1]
            this.carrots.push(position)
            return position;
        }
        return false;
    }

    destroyCarrots() {

        if (this.carrots.length > 1) {
            let firstcarrot = this.carrots[0]
            let pos1 = this.carrots[0][1]
            let pos0 = this.carrots[0][0]
            this.mapJS[pos0][pos1] = this.carrots[0];
            this.carrots.shift();
            return firstcarrot;
        }
        return false;
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


