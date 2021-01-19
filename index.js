// -------------------VARIABLES---------------------
const grid = document.querySelector(".grid");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const displayScore = document.getElementById("score");
const width = 20;

let squares = [];
let snake = [2,1,0];
let direction = 1;
let timerId = 0;
let intervalTime = 700;
let speed = 0.9;
let appleIndex = 0;
let score = 0;
let gamestate = 0;

// --------------------LISTENERS---------------------
startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);
document.addEventListener("keydown", changeDirection);

// ---------CALLING FUNCTIONS/DRAWING SNAKE----------

// create the grid
createGrid();

// draw snake
snake.forEach(index => squares[index].classList.add("snake"));


// ------------------FUNCTIONS-----------------------

// starting/resetting game

function startGame() {
    if (gamestate === 0) {
        // set gamestate to 1 = running
        gamestate = 1;

        // set timer for movement
        timerId = setInterval(move, intervalTime);

        // create first apple
        generateApple();
    }
}

function resetGame() {
    // stop movement
    clearInterval(timerId);

    // reset gamestate
    gamestate = 0;

    // removing snake + apple
    snake.forEach(index => squares[index].classList.remove("snake"));
    squares[appleIndex].classList.remove("apple");

    // setting up snake to original position
    snake = [2,1,0];
    snake.forEach(index => squares[index].classList.add("snake"));

    // resetting direction
    direction = 1;

    // resetting score
    score = 0;
    displayScore.textContent = score;

    // resetting speed
    intervalTime = 700;
}

// creating the snake grid

function createGrid() {
    for(let i = 0; i < width * width; i++) {
        // creating square element
        const square = document.createElement("div");

        // adding the square class for styling
        square.classList.add("square");

        // appending it to existing grid-div
        grid.appendChild(square);

        // pushing square element into array for game usage
        squares.push(square);
    }
}

// creating apple

function generateApple() {
    do {
        // get random number for placement on grid
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake"))

    // place apple on grid
    squares[appleIndex].classList.add("apple");
}

// moving the snake

function move() {
    // checking if snake hits wall or itself + stop game
    if (
        // hit right wall
        (snake[0] % width === width-1 && direction === 1) ||

        // hit left wall
        (snake[0] % width === 0 && direction === -1) ||

        // hit top wall
        (snake[0] - width < 0 && direction === -width) ||

        // hit bottom wall
        (snake[0] + width > width*width && direction === +width) ||

        // bites itself
        (squares[snake[0] + direction].classList.contains("snake"))
    )
    return clearInterval(timerId);

    // removing + storing tail from array
    const tail = snake.pop();

    // removing style from tail square
    squares[tail].classList.remove("snake");

    // adding square to direction the snake is moving
    snake.unshift(snake[0] + direction);

    // check if snake eats apple before adding styling
    if (squares[snake[0]].classList.contains("apple")) {
        
        // remove apple class
        squares[snake[0]].classList.remove("apple");

        // grow snake + snake array
        squares[tail].classList.add("snake");
        snake.push(tail);

        // add 1 to score + display new score
        score++;
        displayScore.textContent = score;

        // generate new apple
        generateApple();

        // increase speed
        clearInterval(timerId);
        intervalTime = intervalTime * speed;
        timerId = setInterval(move, intervalTime);
    }

    // adding style to new snake square
    squares[snake[0]].classList.add("snake");
}

// changing snake direction

function changeDirection(e) {
    // LEFT
    if (e.keyCode === 37 && !(direction === 1)) {
        direction = -1;
    // UP
    } else if (e.keyCode === 38 && !(direction === +width)) {
        direction = -width;
    // RIGHT
    } else if (e.keyCode === 39 && !(direction === -1)) {
        direction = 1;
    // DOWN
    } else if (e.keyCode === 40 && !(direction === -width)) {
        direction = +width;
    }
}




