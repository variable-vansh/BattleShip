const Gameboard = require('../modules/gameBoard')
const Ship = require('../modules/ship')
const Player = require('../modules/player')

//separate board for each player
let board1 = new Gameboard();
let board2 = new Gameboard();

//two players, one real, one computer
let player1 = new Player(board1, 'real')
let player2 = new Player(board2, 'computer')

//the 5 types of ships:
let carrier = new Ship(5)
let battleship = new Ship(4)
let destroyer = new Ship(3)
let patrolBoat = new Ship(3)
let submarine = new Ship(2)

