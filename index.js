const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGame = document.querySelector(".new-game");
const playerGame = document.querySelector("#player");
const computerGame = document.querySelector(".computer");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const playwith1 = document.querySelector(".playwith");
const game = document.querySelector(".tictactoe");
const choose = document.querySelector(".choose");
const playagain = document.querySelector(".play-again");


let currentPlayer;
let gameGrid;
let choice;

const winingPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// initializing the game
playerGame.addEventListener("click", () => {
    playwith1.style.display = "none";
    choose.style.display = "flex";
})
computerGame.addEventListener("click", () => {
    playwith1.style.display = "none";
    choose.style.display = "flex";
})

player1.addEventListener("click", () => {
    playwith1.style.display = "none";
    game.style.display = "grid";
    choose.style.display = "none";
    gameInfo.style.display = "flex";
    newGame.style.display = "flex";
    playagain.style.display = "flex";
    choice = "X";
    console.log(choice);
    initGame();
})
player2.addEventListener("click", () => {
    playwith1.style.display = "none";
    game.style.display = "grid";
    choose.style.display = "none";
    gameInfo.style.display = "flex";
    newGame.style.display = "flex";
    choice = "O";
    playagain.style.display = "flex";
    initGame();
})

newGame.addEventListener("click", () => {
    playwith1.style.display = "flex";
    newGame.style.display = "none";
    playagain.style.display = "none";
    gameInfo.style.display = "none";
    choose.style.display = "none";
    game.style.display = "none";
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index + 1}`;
    })

})
playagain.addEventListener("click", () => {
    playwith1.style.display = "none";
    newGame.style.display = "flex";
    playagain.style.display = "flex";
    gameInfo.style.display = "flex";
    choose.style.display = "none";
    game.style.display = "grid";
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index + 1}`;
    })
    initGame();
})

function initGame() {
    currentPlayer = choice;
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    gameInfo.innerText = `Current Player- ${currentPlayer}`;
};

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = 'O';
    }
    else {
        currentPlayer = "X";
    }
    //update UI
    gameInfo.innerText = `Current Player- ${currentPlayer}`;
}


function checkGameOver() {
    let answer = "";
    winingPositions.forEach((position) => {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]])) {

            if (gameGrid[position[0]] === "X") {
                answer = "X";
            }
            else {
                answer = "O";
            }
            //disabling pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
            gameInfo.innerText = `Winner is: ${answer}`;
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    })
    //We know, NO Winner Found, let's check whether there
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "")
            fillCount++;
    });

    //board is Filled, game is TIE 
    if (fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
    }
}




function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        //swap turns
        swapTurn();
        //checking winning
        checkGameOver();
    }

}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});
