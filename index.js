// const Gameboard = require('../modules/gameBoard')
// const Ship = require('../modules/ship')
// const Player = require('../modules/player')

import Gameboard from './modules/gameBoard.js'
import Ship from './modules/ship.js'
import Player from './modules/player.js'


//separate board for each player
let board1 = new Gameboard();
let board2 = new Gameboard();

//two players, one real, one computer
let player1 = new Player(board1, 'real', true, 'p1')
let player2 = new Player(board2, 'computer', false, 'p2')

//the 5 types of ships:
let carrier = new Ship(5, 'C')
let battleship = new Ship(4, 'B')
let destroyer = new Ship(3, 'D')
let patrolBoat = new Ship(3, 'P')
let submarine = new Ship(2, 'S')

let activePlayer = player1;
let inactivePlayer = player2;

let shipsPlaced = false;

let turnMessage = document.getElementById('turnMessage')
if (shipsPlaced == false) {
    turnMessage.innerText = "Place ships"
}

// b1.style.backgroundColor = "blue"
// b2.style.backgroundColor = "blue"

// console.log(board1.boardArr)


let attackButton = document.getElementById('attackButton');
let attackXInput = document.getElementById('attackX');
let attackYInput = document.getElementById('attackY');





attackButton.addEventListener('click', function (e) {
    // Prevent the default form submission behavior
    e.preventDefault();

    if (activePlayer.UID == 'p2') {
        turnMessage.innerText = "IT'S YOUR TURN"
    } else {
        turnMessage.innerText = "COMPUTER'S TURN"
    }

    if (activePlayer.UID == 'p2') {
        console.log(`p1's turn`)
        let activeBoardBorder = document.getElementById('board1')
        let inActiveBoardBorder = document.getElementById('board2')

        activeBoardBorder.style.opacity = 0.7;
        inActiveBoardBorder.style.opacity = 1;

        // Select all buttons within that div
        const buttons = activeBoardBorder.querySelectorAll('.coverButtons');

        // Disable all selected buttons
        buttons.forEach(button => {
            button.disabled = true;
        });

    } else if (activePlayer.UID == 'p1') {
        console.log(`p2's turn`)
        let activeBoardBorder = document.getElementById('board1')
        let inActiveBoardBorder = document.getElementById('board2')

        activeBoardBorder.style.opacity = 1;
        inActiveBoardBorder.style.opacity = 0.7;

        const buttons = inActiveBoardBorder.querySelectorAll('button');

        // Disable all selected buttons
        buttons.forEach(button => {
            button.disabled = true;
        });

    }


    // if (activePlayer.UID == 'p2') {
    //     let activeBoardBorder = document.getElementById('board1')
    //     let inActiveBoardBorder = document.getElementById('board2')

    //     activeBoardBorder.style.borderColor = "#001426"
    //     inActiveBoardBorder.style.borderColor = "#003566"

    // } else if (activePlayer.UID == 'p1') {
    //     let activeBoardBorder = document.getElementById('board2')
    //     let inActiveBoardBorder = document.getElementById('board1')

    //     activeBoardBorder.style.borderColor = "#003566"
    //     inActiveBoardBorder.style.borderColor = "#001426"
    // }



    let attackX = parseInt(attackXInput.value);
    let attackY = parseInt(attackYInput.value);

    //game working logic
    let isGameOver = gameWorkLogic(attackX, attackY)
    if (isGameOver) {
        attackButton.disabled = true;
        setTimeout(gameOverAction, 500)
    }
    // console.log(attackX, attackY)

    //active player attacks
    //inactive player recieves attack

    inactivePlayer.board.recieveAttack(attackX, attackY, inactivePlayer.UID)

    let block1 = document.getElementById("board1")
    let block2 = document.getElementById("board2")
    board1.display(block1, player1.UID);
    board2.display(block2, player2.UID);
    let cellCovers = document.getElementsByClassName('cellCover');

    clickBlockToReveal()
    //switch active player
    let temp = activePlayer
    activePlayer = inactivePlayer
    inactivePlayer = temp;


    attackXInput.value = ''
    attackYInput.value = '';
}
)

let randomPlaceShips = document.getElementById('randomPlaceShips');
randomPlaceShips.addEventListener('click', function () {
    shipsPlaced = true;
    turnMessage.innerText = "Ships placed"

    if (placeShipsRandomly()) {
        // Update the display after successful placement
        board1.display(block1, player1.UID);
        board2.display(block2, player2.UID);
        clickBlockToReveal();
    } else {
        alert("Failed to place ships randomly. Please try again.");
    }

    //disable all board buttons in the start, they are enanled only when start is clicked
    let coverButtons = document.querySelectorAll('.cellCover');
    coverButtons.forEach(button => {
        button.disabled = true;
    });
    startButton.disabled = false

    let board1cover = document.querySelector('#board1')
    let playerBoardCover = board1cover.querySelectorAll('.cellCover')
    playerBoardCover.forEach(cover => {
        cover.style.opacity = 0;
    });

});

//dummy play
// player1.turn = true;
// player1.turnDisplay('player1');
// board2.placeShip(destroyer, 'vertical', 2, 2)
// board2.placeShip(submarine, 'vertical', 4, 4)
// board2.placeShip(carrier, 'horizontal', 9, 0)
// board2.placeShip(battleship, 'horizontal', 0, 0)
// board2.placeShip(patrolBoat, 'vertical', 0, 9)

// board1.placeShip(destroyer, 'vertical', 0, 0)
// board1.placeShip(submarine, 'vertical', 3, 2)
// board1.placeShip(carrier, 'horizontal', 5, 5)
// board1.placeShip(battleship, 'horizontal', 8, 0)
// board1.placeShip(patrolBoat, 'vertical', 0, 9)


//displays board- initial
let block1 = document.getElementById("board1")
let block2 = document.getElementById("board2")
board1.display(block1, player1.UID);
board2.display(block2, player2.UID);
clickBlockToReveal()

//disable all board buttons in the start, they are enanled only when start is clicked
let coverButtons = document.querySelectorAll('.cellCover');
coverButtons.forEach(button => {
    button.disabled = true;
});

let startButton = document.getElementById('startBtn');
startButton.disabled = true

startButton.addEventListener('click', function () {
    let coverButtons = document.querySelectorAll('.cellCover');
    coverButtons.forEach(button => {
        button.disabled = false;
    });
    startButton.disabled = true

    let board1cover = document.querySelector('#board1')
    let playerBoardCover = board1cover.querySelectorAll('.cellCover')
    playerBoardCover.forEach(cover => {
        cover.style.opacity = 1;
    });

    let activeBoardBorder = document.getElementById('board1')
    let inActiveBoardBorder = document.getElementById('board2')

    activeBoardBorder.style.opacity = 0.7;
    inActiveBoardBorder.style.opacity = 1;

    randomPlaceShips.disabled = true
    turnMessage.innerText = "IT'S YOUR TURN"

    let attackButton = document.getElementById('attackButton');
    attackButton.disabled = false


})

function clickBlockToReveal() {
    let cellCovers = document.getElementsByClassName('cellCover');


    if (activePlayer.UID == 'p2') {
        console.log(`p1's turn`)
        let activeBoardBorder = document.getElementById('board1')
        // let inActiveBoardBorder = document.getElementById('board2')


        // Select all buttons within that div
        const buttons = activeBoardBorder.querySelectorAll('.coverButtons');

        // Disable all selected buttons
        buttons.forEach(button => {
            button.disabled = true;
        });

    } else if (activePlayer.UID == 'p1') {
        console.log(`p2's turn`)
        let activeBoardBorder = document.getElementById('board1')
        let inActiveBoardBorder = document.getElementById('board2')


        const buttons = inActiveBoardBorder.querySelectorAll('button');

        // Disable all selected buttons
        buttons.forEach(button => {
            button.disabled = true;
        });

    }

    for (let i = 0; i < cellCovers.length; i++) {
        cellCovers[i].addEventListener('click', function (event) {
            let cellBoardId = this.parentElement.id;
            // console.log(cellBoardId)
            let xAttack = cellBoardId.charAt(5);
            let yAttack = cellBoardId.charAt(7);
            let clickedPlayerID = cellBoardId.substring(9, 11)
            // inactivePlayer.UID = cellBoardId.substring(8, 10)
            // console.log(clickedPlayerID)

            attackXInput.value = xAttack;
            attackYInput.value = yAttack;
            // inactivePlayer.UID=
            if (inactivePlayer.UID == clickedPlayerID) {
                attackButton.click()
            } else {
                alert('invalid click')
            }


        });
    }
}

function gameWorkLogic(attackX, attackY) {
    let hitCellValue = inactivePlayer.board.boardArr[attackX][attackY]
    console.log(hitCellValue)
    //conditions to check cell value and hit ship
    //also add completely hit ship to player array
    if (hitCellValue == 'C') {
        inactivePlayer.shipArray[0].hit();
        let sunkCheck = inactivePlayer.shipArray[0].isSunk()
        if (sunkCheck) {
            inactivePlayer.sunkenShips.push(inactivePlayer.shipArray[0])
        }
    }
    if (hitCellValue == 'B') {
        inactivePlayer.shipArray[1].hit();
        let sunkCheck = inactivePlayer.shipArray[1].isSunk()
        if (sunkCheck) {
            inactivePlayer.sunkenShips.push(inactivePlayer.shipArray[1])
        }
    }
    if (hitCellValue == 'D') {
        inactivePlayer.shipArray[2].hit();
        let sunkCheck = inactivePlayer.shipArray[2].isSunk()
        if (sunkCheck) {
            inactivePlayer.sunkenShips.push(inactivePlayer.shipArray[2])
        }
    }
    if (hitCellValue == 'P') {
        inactivePlayer.shipArray[3].hit();
        let sunkCheck = inactivePlayer.shipArray[3].isSunk()
        if (sunkCheck) {
            inactivePlayer.sunkenShips.push(inactivePlayer.shipArray[3])
        }
    }
    if (hitCellValue == 'S') {
        inactivePlayer.shipArray[4].hit();
        let sunkCheck = inactivePlayer.shipArray[4].isSunk()
        if (sunkCheck) {
            inactivePlayer.sunkenShips.push(inactivePlayer.shipArray[4])
        }
    }

    // console.log(inactivePlayer.sunkenShips.length)

    if (inactivePlayer.sunkenShips.length == 5) {
        console.log(`${activePlayer.UID} WON`)
        return true
    }
}

function gameOverAction() {
    alert("game over")

}


function placeShipsRandomly() {



    const ships = [
        { name: 'carrier', size: 5, symbol: 'C' },
        { name: 'battleship', size: 4, symbol: 'B' },
        { name: 'destroyer', size: 3, symbol: 'D' },
        { name: 'patrolBoat', size: 3, symbol: 'P' },
        { name: 'submarine', size: 2, symbol: 'S' }
    ];

    function isValidCoordinate(x, y) {
        return x >= 0 && x < 10 && y >= 0 && y < 10;
    }

    function canPlaceShip(board, x, y, size, isVertical) {
        for (let i = 0; i < size; i++) {
            const checkX = isVertical ? x + i : x;
            const checkY = isVertical ? y : y + i;

            if (!isValidCoordinate(checkX, checkY) || board.boardArr[checkX][checkY] !== 0) {
                return false;
            }
        }
        return true;
    }

    function placeShip(board, ship) {
        let attempts = 0;
        const maxAttempts = 100;

        while (attempts < maxAttempts) {
            const isVertical = Math.random() < 0.5;
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);

            if (canPlaceShip(board, x, y, ship.size, isVertical)) {
                const orientation = isVertical ? 'vertical' : 'horizontal';
                board.placeShip({ length: ship.size, uid: ship.symbol }, orientation, x, y);
                console.log(`Successfully placed ${ship.name} at (${x}, ${y}), ${orientation}`);
                return true;
            }

            attempts++;
        }

        console.log(`Failed to place ${ship.name} after ${maxAttempts} attempts`);
        return false;
    }

    let placementAttempts = 0;
    const maxPlacementAttempts = 50;

    while (placementAttempts < maxPlacementAttempts) {
        let success = true;
        board1.resetBoard();
        board2.resetBoard();

        for (const ship of ships) {
            if (!placeShip(board1, ship) || !placeShip(board2, ship)) {
                success = false;
                break;
            }
        }

        if (success) {
            console.log('All ships placed successfully!');
            return true;
        }

        placementAttempts++;
        console.log(`Attempt ${placementAttempts}: Failed to place all ships. Retrying.`);
    }

    console.log(`Failed to place all ships after ${maxPlacementAttempts} attempts`);

    return false;
}

attackButton.disabled = true

// let activeBoardBorder = document.getElementById('board1')
// let inActiveBoardBorder = document.getElementById('board2')

// activeBoardBorder.style.opacity = 0.7;
// inActiveBoardBorder.style.opacity = 1;


