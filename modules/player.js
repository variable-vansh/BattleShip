// There will be two types of players in the game, ‘real’ players and ‘computer’ players.
// Each player object should contain its own gameboard.

class Player {
    constructor(board, type) {
        this.board = board;
        this.type = type;
    }
}

// module.exports = Player;
export default Player;