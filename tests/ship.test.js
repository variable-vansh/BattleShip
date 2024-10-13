const Ship = require('../modules/ship')

test('ship is being created with right properties', () => {
    let newShip = new Ship(5);
    expect(newShip.length).toBe(5);
    expect(newShip.hitsTaken).toBe(0);
    expect(newShip.sunk).toBe(false);
})

test('hit() functions is working well', () => {
    let newShip = new Ship(4);
    newShip.hit()
    newShip.hit()
    newShip.hit()
    expect(newShip.hitsTaken).toBe(3);
})

test('isSunk() functions is working well', () => {
    let newShip = new Ship(4);
    newShip.hit()
    newShip.hit()
    newShip.hit()
    newShip.hit()
    expect(newShip.isSunk()).toBe(true);
})

