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


// b1.style.backgroundColor = "blue"
// b2.style.backgroundColor = "blue"

// console.log(board1.boardArr)


let attackButton = document.getElementById('attackButton');
let attackXInput = document.getElementById('attackX');
let attackYInput = document.getElementById('attackY');


attackButton.addEventListener('click', function (e) {
    // Prevent the default form submission behavior
    e.preventDefault();

    console.log(activePlayer)
    let attackX = attackXInput.value;
    let attackY = attackYInput.value;
    console.log(attackX, attackY)

    //active player attacks
    //inactive player recieves attack
    inactivePlayer.board.recieveAttack(attackX, attackY, inactivePlayer.UID)

    let block1 = document.getElementById("board1")
    let block2 = document.getElementById("board2")
    board1.display(block1, player1.UID);
    board2.display(block2, player2.UID);

    //switch active player
    let temp = activePlayer
    activePlayer = inactivePlayer
    inactivePlayer = temp;

    attackXInput.value = ''
    attackYInput.value = ''
}
)

//dummy play
// player1.turn = true;
// player1.turnDisplay('player1');
board2.placeShip(destroyer, 'vertical', 2, 2)
board2.placeShip(submarine, 'vertical', 4, 4)
board2.placeShip(carrier, 'horizontal', 9, 0)
board2.placeShip(battleship, 'horizontal', 0, 0)
board2.placeShip(patrolBoat, 'vertical', 0, 9)

board1.placeShip(destroyer, 'vertical', 0, 0)
board1.placeShip(submarine, 'vertical', 3, 2)
board1.placeShip(carrier, 'horizontal', 5, 5)
board1.placeShip(battleship, 'horizontal', 8, 0)
board1.placeShip(patrolBoat, 'vertical', 0, 9)



// board2.patrolBoat(destroyer, 'vertical', 2, 3)
// board2.placeShip(destroyer, 'vertical', 2, 2)
// board2.placeShip(destroyer, 'vertical', 2, 2)
// board2.placeShip(destroyer, 'vertical', 2, 2)



//displays board
let block1 = document.getElementById("board1")
let block2 = document.getElementById("board2")
board1.display(block1, player1.UID);
board2.display(block2, player2.UID);



// for (let i = 0; i < 10; i++) {
//     for (let j = 0; j < 10; j++) {
//         let cellBoard1 = document.createElement("div");
//         let cellBoard2 = document.createElement("div");

//         cellBoard1.classList.add("cellBoard1")
//         cellBoard2.classList.add("cellBoard2")

//         cellBoard1.innerText = board1.boardArr[i][j]
//         cellBoard2.innerText = board2.boardArr[i][j]

//         if (cellBoard1.innerHTML == 'C') {
//             cellBoard1.style.backgroundColor = 'violet'
//         }
//         if (cellBoard2.innerHTML == 'C') {
//             cellBoard2.style.backgroundColor = 'violet'
//         }

//         if (cellBoard1.innerHTML == 'B') {
//             cellBoard1.style.backgroundColor = 'green'
//         }
//         if (cellBoard2.innerHTML == 'B') {
//             cellBoard2.style.backgroundColor = 'green'
//         }

//         if (cellBoard1.innerHTML == 'D') {
//             cellBoard1.style.backgroundColor = 'yellow'
//         }
//         if (cellBoard2.innerHTML == 'D') {
//             cellBoard2.style.backgroundColor = 'yellow'
//         }

//         if (cellBoard1.innerHTML == 'P') {
//             cellBoard1.style.backgroundColor = 'orange'
//         }
//         if (cellBoard2.innerHTML == 'P') {
//             cellBoard2.style.backgroundColor = 'orange'
//         }

//         if (cellBoard1.innerHTML == 'S') {
//             cellBoard1.style.backgroundColor = 'blue'
//         }
//         if (cellBoard2.innerHTML == 'S') {
//             cellBoard2.style.backgroundColor = 'blue'
//         }

//         b1.appendChild(cellBoard1)
//         b2.appendChild(cellBoard2)

//     }
// }



