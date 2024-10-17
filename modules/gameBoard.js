// Create a Gameboard class/factory.
// Note that we have not yet created any User Interface.We should know our code is coming together by running the tests.You shouldn’t be relying on console.log or DOM methods to make sure your code is doing what you expect it to.
// Gameboards should be able to place ships at specific coordinates by calling the ship factory or class.
// Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
// Gameboards should keep track of missed attacks so they can display them properly.
// Gameboards should be able to report whether or not all of their ships have been sunk.

// const { check } = require("yargs");

class Gameboard {
    //made a 10x10 board
    constructor() {
        this.revealedCells = [];
        this.boardArr = [];
        for (let x = 0; x < 10; x++) {
            this.boardArr[x] = [];
            for (let y = 0; y < 10; y++) {
                //0 for vacant spot
                this.boardArr[x][y] = 0;
                // this.boardArr[x][y] = `(${x},${y})`;
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
                    this.boardArr[x][y + i] = ship.uid;
                }
                // console.log(this.boardArr)
                return 'ship placed successfully'
            }
            if (orientation == 'vertical') {
                for (let i = 0; i < ship.length; i++) {
                    //1 for occupied spot
                    this.boardArr[x + i][y] = ship.uid;
                }
                return 'ship placed successfully'
            }
        }
        // alert("invalid ship placement")
        return
    }

    //take in pair of co-ordinates
    //if ship present there, update hit() function
    //if ship not present, mark the missed spot, such that same spot cannot be hit again
    recieveAttack(x, y, UID) {
        //0 -Vacant Spot
        //1 -Intact ship
        //2 -Ship has been hit
        //-1 -Missed hit

        // Convert x and y to integers
        // x = parseInt(x);
        // y = parseInt(y);

        console.log(`hit on (${x},${y}) of player: ${UID}`)


        // console.log(this.boardArr[x][y])
        let cell = document.getElementById(`cell-${x}-${y}-${UID}`);
        let cellCover = cell.querySelector('.cellCover');

        let cellDisplay = document.getElementById(`cell-${x}-${y}-${UID}-display`)
        cellDisplay.classList.add('revealed')

        if (cellCover) {
            cellCover.classList.add('revealed');
            this.revealedCells.push([x, y, UID]);
        }

        //intact ship
        if (this.boardArr[x][y] == 1) {
            //now it has been hit
            this.boardArr[x][y] = 2;

            //to check if all ships have sunk
            let allShipsSunk = checkAllShips(this.boardArr);
            if (allShipsSunk == true) {
                return
            }

            // this.revealedCells.push([x, y]);
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

    display(block, UID) {
        //cellBoard is the botttom-most cell layer that runs the logic
        //cellDisplay goes above cellBoard, it shows up when the cell is clicked
        //cellCover is the topmost layer to cover everything else up


        block.innerHTML = '';

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let cellBoard = document.createElement("button");
                cellBoard.classList.add("cellBoard")
                cellBoard.id = `cell-${i}-${j}-${UID}` // Add an ID to the cell
                cellBoard.innerText = this.boardArr[i][j]

                let cellCover = document.createElement('button')
                cellCover.classList.add("cellCover")

                let cellDisplay = document.createElement('div');
                cellDisplay.classList.add("cellDisplay")
                cellDisplay.id = `cell-${i}-${j}-${UID}-display` // Add an ID to the cell
                // cellDisplay.innerText = 'dis'


                // Check if the cell has been revealed
                if (this.revealedCells.find(cell => cell[0] === i && cell[1] === j && cell[2] === UID)) {
                    cellCover.classList.add('revealed') // Reveal the cell
                    if (this.boardArr[i][j] == 'C' || this.boardArr[i][j] == 'B' || this.boardArr[i][j] == 'D' || this.boardArr[i][j] == 'P' || this.boardArr[i][j] == 'S') {
                        // cellDisplay.innerText = '';
                        cellDisplay.classList.add('revealed')
                    }
                }

                if (this.boardArr[i][j] == 'C') {
                    cellDisplay.style.backgroundColor = '#2C7CE5'
                }
                if (this.boardArr[i][j] == 'B') {
                    cellDisplay.style.backgroundColor = '#49CC5C'
                }
                if (this.boardArr[i][j] == 'D') {
                    cellDisplay.style.backgroundColor = '#F8C421'
                }
                if (this.boardArr[i][j] == 'P') {
                    cellDisplay.style.backgroundColor = '#FB6640'
                }
                if (this.boardArr[i][j] == 'S') {
                    cellDisplay.style.backgroundColor = '#F82553'
                }

                // if (cellBoard.innerHTML == 'C') {
                //     cellBoard.style.backgroundColor = 'violet'
                // }
                // if (cellBoard.innerHTML == 'B') {
                //     cellBoard.style.backgroundColor = 'green'
                // }
                // if (cellBoard.innerHTML == 'D') {
                //     cellBoard.style.backgroundColor = 'yellow'
                // }
                // if (cellBoard.innerHTML == 'P') {
                //     cellBoard.style.backgroundColor = 'orange'
                // }
                // if (cellBoard.innerHTML == 'S') {
                //     cellBoard.style.backgroundColor = 'blue'
                // }

                // cellBoard.appendChild(cellCover)
                // block.appendChild(cellBoard)

                cellBoard.appendChild(cellDisplay)
                cellDisplay.appendChild(cellCover)
                block.appendChild(cellBoard)

            }
        }



    }

    resetBoard() {
        this.revealedCells = [];
        this.boardArr = [];
        for (let x = 0; x < 10; x++) {
            this.boardArr[x] = [];
            for (let y = 0; y < 10; y++) {
                this.boardArr[x][y] = 0;
            }
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

// module.exports = Gameboard;
export default Gameboard;
