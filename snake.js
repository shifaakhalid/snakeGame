var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;


//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
//food
var foodX = blockSize * 10;
var foodY = blockSize * 10;
//speed
var velocityX = 0;
var velocityY = 0;
//body
var snakeBody =[];
//gameover
var gameOver = false;
let score = 0;

//on game load 
window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");
    placeFood();
     document.addEventListener("keyup", ChangeDirection)
    setInterval(update, 500/5);
}
//update functions after onload
function update() {
    if(gameOver){
      return;

}
 context.fillStyle="#CBE2B5";
 context.fillRect(0, 0, board.width, board.height);

 context.fillStyle ="#921A40";
 context.fillRect(foodX, foodY, blockSize, blockSize);
 if (snakeX == foodX && snakeY == foodY){
    snakeBody.push([foodX,foodY])
    placeFood();
     updateScore();
 }

 for(let i = snakeBody.length-1; i > 0; i--){
    snakeBody[i] = snakeBody[i-1];
     
  }
  if(snakeBody.length){
    snakeBody[0] = [snakeX,snakeY];
   
  }

 context.fillStyle ="#A2CA71";
 snakeX +=  velocityX*blockSize;
 snakeY +=  velocityY*blockSize;
 context.fillRect(snakeX, snakeY, blockSize, blockSize);
 for(let i = 0; i<snakeBody.length; i++){
    context.fillRect(snakeBody[i][0],snakeBody[i][1], blockSize, blockSize);
 }

 //gameover conditions
 if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize){
    gameOver = true;
    playAgain();
 }
 for(let i = 0; i < snakeBody.length; i++){
    if(snakeX ==snakeBody[i][0] && snakeY == snakeBody[i][1]  ){
        gameOver= true;
        playAgain();
    }
 }


}
//change directions function
function ChangeDirection(e){
    if(e.code == "ArrowUp" && velocityY  != 1){
        velocityX = 0;
        velocityY =-1;
    }
    else if(e.code == "ArrowDown" && velocityY  != -1 ){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowLeft" && velocityX  != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.code == "ArrowRight" && velocityX  != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

 
//randomly place food function
function placeFood(){
    foodX = Math.floor(Math.random()* cols) * blockSize;
    foodY = Math.floor(Math.random()* rows) * blockSize;
}

//playagain button function
function playAgain(){
    board = document.getElementById("board");
    playagain = document.getElementById("playagain");
    playagain.style.display ="block";
    board.style.filter = "blur(6px)";
}

//increase score  function
function updateScore() {
    score++;
    document.getElementById("score").textContent = score;
}
