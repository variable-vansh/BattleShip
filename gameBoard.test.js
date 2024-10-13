const Gameboard = require('./gameBoard')
const Ship = require('./ship')

test('GameBoard is being created with right properties', () => {
    let newBoard = new Gameboard();
    expect(newBoard.boardArr).toEqual(
        [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);
})

test('placeShip function is placing ships horizontally on valid square', () => {
    let newBoard = new Gameboard();
    let Destroyer = new Ship(4);
    expect(newBoard.placeShip(Destroyer, 'horizontal', 3, 6)).toBe('ship placed successfully');
    // console.log(newBoard.boardArr)
})

test('placeShip function is placing ships vertically on valid square', () => {
    let newBoard = new Gameboard();
    let Destroyer = new Ship(3)
    expect(newBoard.placeShip(Destroyer, 'vertical', 3, 3)).toBe('ship placed successfully');
})

test('placeShip function is not placing ships on invalid square', () => {
    let newBoard = new Gameboard();
    let Destroyer = new Ship(3)
    expect(newBoard.placeShip(Destroyer, 'horizontal', 8, 8)).toBe('unplaced, invalid co-ordinates');
})

test('placeShip function is not placing ships vertically on invalid square', () => {
    let newBoard = new Gameboard();
    let Destroyer = new Ship(3);
    expect(newBoard.placeShip(Destroyer, 'horizontal', 1, 8)).toBe('unplaced, invalid co-ordinates');
})

test('receives attack on vacant spot', () => {
    let newBoard = new Gameboard();
    let Destroyer = new Ship(3);
    newBoard.placeShip(Destroyer, 'horizontal', 3, 0);
    // console.log(newBoard.boardArr)
    expect(newBoard.recieveAttack(1, 8)).toBe();
    // console.log(newBoard.boardArr)
})

test('receives attack on intact ship', () => {
    let newBoard = new Gameboard();
    let Destroyer = new Ship(3);
    newBoard.placeShip(Destroyer, 'horizontal', 1, 1);

    expect(newBoard.recieveAttack(1, 2)).toBe();
    // console.log(newBoard.boardArr)
})

test('receives attack on already hit spot', () => {
    let newBoard = new Gameboard();
    let Destroyer = new Ship(3);
    newBoard.placeShip(Destroyer, 'horizontal', 1, 8);
    newBoard.recieveAttack(1, 2);
    expect(newBoard.recieveAttack(1, 2)).toBe();
})

test('receives attack on already missed spot', () => {
    let newBoard = new Gameboard();
    let Destroyer = new Ship(3);
    newBoard.placeShip(Destroyer, 'horizontal', 1, 8);
    newBoard.recieveAttack(5, 5);
    expect(newBoard.recieveAttack(5, 5)).toBe();
})



test('GameBoard is being created with right properties', () => {
    let newBoard = new Gameboard();
    expect(newBoard.boardArr).toEqual(
        [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);
})