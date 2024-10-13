// Create a Gameboard class/factory.
// Note that we have not yet created any User Interface.We should know our code is coming together by running the tests.You shouldn’t be relying on console.log or DOM methods to make sure your code is doing what you expect it to.
// Gameboards should be able to place ships at specific coordinates by calling the ship factory or class.
// Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
// Gameboards should keep track of missed attacks so they can display them properly.
// Gameboards should be able to report whether or not all of their ships have been sunk.

const { check } = require("yargs");

class Gameboard {
    //made a 10x10 board
    constructor() {
        this.boardArr = [];
        for (let x = 0; x < 10; x++) {
            this.boardArr[x] = [];
            for (let y = 0; y < 10; y++) {
                //0 for vacant spot
                this.boardArr[x][y] = 0;
            }
        }
    }

    //takes in ship type, orientation, x, y values to place ship on board while game setup
    placeShip(ship, orientation, x, y) {
        //checks if the required cells are vacant
        let vacancyCondition = vacacyConditionFunction(ship, orientation, x, y, this)

        if (vacancyCondition) {
            if (orientation == 'horizontal') {
                for (let i = 0; i < ship.length; i++) {
                    //1 for occupied spot
                    this.boardArr[x][y + i] = 1;
                }
                // console.log(this.boardArr)
                return 'ship placed successfully'
            }
            if (orientation == 'vertical') {
                for (let i = 0; i < ship.length; i++) {
                    //1 for occupied spot
                    this.boardArr[x + i][y] = 1;
                }
                return 'ship placed successfully'
            }
        }
        return 'unplaced, invalid co-ordinates'
    }

    //take in pair of co-ordinates
    //if ship present there, update hit() function
    //if ship not present, mark the missed spot, such that same spot cannot be hit again
    recieveAttack(x, y) {
        //0  -Vacant Spot
        //1  -Intact ship
        //2  -Ship has been hit
        //-1 -Missed hit 

        //intact ship
        if (this.boardArr[x][y] == 1) {
            //now it has been hit
            this.boardArr[x][y] = 2;

            //to check if all ships have sunk
            let allShipsSunk = checkAllShips(this.boardArr);
            if (allShipsSunk == true) {
                return
            }

            return;
        }

        //vacant spot, no ship
        if (this.boardArr[x][y] == 0) {
            //missed hit
            this.boardArr[x][y] = -1;
            // console.log(this.boardArr)
            return;
        }

        //destroyed spot, can't hit
        //or no ship here, missed it
        if (this.boardArr[x][y] == 2 || this.boardArr[x][y] == -1) {
            //nothing to do
            // console.log("already hit here bhai")
            return;
        }

    }



}

function vacacyConditionFunction(ship, orientation, x, y, GameBoard) {
    if (orientation == 'horizontal') {
        for (let i = 0; i < ship.length; i++) {
            if (GameBoard.boardArr[x][y + i] != 0) {
                return false;
            }
        }
    }
    if (orientation == 'vertical') {
        for (let i = 0; i < ship.length; i++) {
            if (GameBoard.boardArr[x + i][y] != 0) {
                return false;
            }
        }
    }

    return true;
}

function checkAllShips(boardArr) {
    let hitcounter = 0;
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            if (boardArr[x][y] == 2) {
                hitcounter++;
            }
        }
    }
    if (hitcounter == 14) {
        return true
    }
    return false;
}

module.exports = Gameboard;
