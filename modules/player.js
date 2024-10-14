// There will be two types of players in the game, ‘real’ players and ‘computer’ players.
// Each player object should contain its own gameboard.

class Player {
    constructor(board, type, turn = false, UID) {
        this.board = board;
        this.type = type;
        this.turn = turn;
        this.UID = UID;
    }

    turnDisplay(playerName) {
        let turnBox = document.getElementById("turnBox")
        if (this.turn) {
            turnBox.innerText = `It's ${playerName}'s turn`
        }
    }

    switchActivePlayer(presentCondition) {
        if (presentCondition == true) {
            this.turn = false;
        } else {
            this.turn = true;
        }
        return;
    }
}

// module.exports = Player;
export default Player;