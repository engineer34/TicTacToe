const GameBoard = (()=> {
    const board = Array(9).fill("none");
    const reCell = (index, symbol)=> {
        if (board[index] === "none"){
            board[index] = symbol;
            return true;
        }
        return false;
    };
    //let our board get our board array
    const getBoard = () =>board;
    const restart = ()=> {
        //reset our board clear it
        board.fill("none");
    };
    return {
        reCell, restart, getBoard
    };
})();
    const Player = (symbol) => {
        return { symbol }; 
    };
//our game controller module originally used var but got errors
const GameController= (()=>{
    const player1 = Player("x");
    const player2 = Player("o");
    let currentPlayer = player1;
    let gameOver = false;
    let playerMoves = 0;
    const spans = document.getElementsByTagName("span");
    const winChecker = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]];
    const playerTurn = (element) =>{
        if (gameOver) return;
        const index = [...spans].indexOf(element);
        if (!GameBoard.reCell(index, currentPlayer.symbol)) return;
        element.innerHTML = currentPlayer.symbol;
        element.dataset.player=currentPlayer.symbol;
        playerMoves++;
        if (checkWinner()){
            endGame(`${currentPlayer.symbol.toUpperCase()}WINS!`);
            return;
        }
        if (playerMoves === 9) {
            endGame("DRAW!!!!!");return;
        }
currentPlayer = currentPlayer === player1? player2:player1;
    };
    const checkWinner = () => {
        const board = GameBoard.getBoard();
        return winChecker.some(combo =>
            combo.every(i=>board[i] === currentPlayer.symbol)
        );
    };
    //our endgame message
    const endGame =(message)=>{
        gameOver = true;
        const div = document.createElement("div");
        div.className = "alert";
        div.innerHTML = `<b>${message}</b><br><br><button onclick="GameController.restart()">Restart</button>`;
    document.body.appendChild(div);
    };
    const restart = () => {
        //restarts oir gameboard
        GameBoard.restart();
        gameOver=false; //setting game over to false so game doesnt end
        playerMoves = 0;
        currentPlayer = player1; //our currentplayer is always start with player1 (X)
        //sets our query alert to show small box message
        document.querySelector(".alert")?.remove();
        for(let span of spans) {
            span.dataset.player="none";
            span.innerHTML="&nbsp;"
            span.parentNode.classList.remove("activeBox");
        }
    };
    return {playerTurn,
        restart
    };
})(); //small error i had to google with my code was adding the () in the end
//glaobal func for html onclick
function play(e) {
    GameController.playerTurn(e);
}

/*var isGameOver =false;
var playerMoves = 0;
var playerTurn = "x";
var span = document.getElementsByTagName("span");
var resetButton= '<button onclick="playAgain()">Reset</button>';

function play(y) {
    if (y.dataset.player === "none" && !isGameOver) {
        y.innerHTML = playerTurn;
        y.dataset.player = playerTurn;
        playerMoves++;
        if (playerTurn == "x"){
            playerTurn = "o";
        } else if (playerTurn == "o"){
            playerTurn = "x";
        }

    }
    checkWinner(1,2,3);
    checkWinner(4,5,6);
    checkWinner(7,8,9);
    checkWinner(1,4,7);
    checkWinner(2,5,8);
    checkWinner(3,6,9);
    checkWinner(1,5,9);
    checkWinner(3,5,7);

    /* no win tie
    if (playerMoves == 9 && !isGameOver) { draw(); }
}
function checkWinner(a,b,c){
    a--;
    b--;
    c--;
    if ((span[a].dataset.player === span[b].dataset.player)
        && (span[b].dataset.player === span[c].dataset.player)
        && (span[a].dataset.player === "x" || span[a].dataset.player === "o")
        && isGameOver == false) {
            span[a].parentNode.classList.add("activeBox");
            span[b].parentNode.classList.add("activeBox");
            span[c].parentNode.classList.add("activeBox");
            gameOver(a);
        }
}

    function resetGame() {
        for (i=0; i < span.length; i++) {
            span[i].dataset.player = "none";
            span[i].innerHTML = "&nbsp;";
        }
        playerTurn = "x";
    }

    function gameOver(a) {
        var gameOverAlertElement = "<b>GAME OVER </b><br><br> Player "
         + span[a].dataset.player.toUpperCase() + 
         'Win! <br><br>' + resetButton;
         var div = document.createElement("div");
         div.className = "alert";
         div.innerHTML = gameOverAlertElement;
         document.body.appendChild(div);
         !isGameOver
         playerMoves = 0;
    }
    function draw() {
        var drawAlertElement = '<b>DRAW! </br><br><br>' + resetButton;
        var div = document.createElement("div");
        div.className = "alert";
        div.innerHTML = drawAlertElement;
        document.body.appendChild(div);
        !isGameOver
        playerMoves = 0;
    }
    function playAgain() {
    document.querySelector(".alert")?.remove();
    for (var i = 0; i < span.length; i++) {
        span[i].dataset.player = "none";
        span[i].innerHTML = "&nbsp;";
        span[i].parentNode.classList.remove("activeBox");
    }
}
*/