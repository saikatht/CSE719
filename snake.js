const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//create the unit
const box=32;

//load image
const ground=new Image();
ground.src="image/ground2.png";

const foodImg=new Image();
foodImg.src="img/food2.png";

//load audio files
const dead= new Audio();
const eat= new Audio();
const up= new Audio();
const down= new Audio();
const left= new Audio();
const right= new Audio();

dead.src="audio/dead.mp3";
eat.src="audio/eat.mp3";
up.src="audio/up.mp3";
down.src="audio/down.mp3";
right.src="audio/right.mp3";
left.src="audio/left.mp3";



//create the Snake
let snake = [];
snake[0]={
  x:9*box,
  y:10*box
}

//create the food
let food={
  x:Math.floor(Math.random()*17+1)*box,
  y:Math.floor(Math.random()*15+3)*box

}

//score variable
let score=0;
var highscore = localStorage.getItem("highscore");

//controll the snake

let d;
document.addEventListener("keydown",direction);

function direction(event){
  if(event.keyCode==37 && d!="RIGHT"  ){
    d="LEFT";
    left.play();
  }else if(event.keyCode==38 && d!="DOWN"){
    d="UP";
    up.play();
  }else if(event.keyCode==39 && d!="LEFT"){
    d="RIGHT";
    right.play();
  }else if(event.keyCode==40 && d!="UP"){
    d="DOWN";
    down.play();
  }
}
//collision function
function collision(head,array){
  for(let i=0; i<array.length;i++){
    if(head.x==array[i].x && head.y==array[i].y){
      return true;
    }
  }
  return false;
}

//draw in canvas
function draw(){

  //draw the ground
  ctx.drawImage(ground,0,0);

  //draw the snake
  for(let i=0; i < snake.length ; i++ ){
    ctx.fillStyle = (i==0)?"black":"white";
    ctx.fillRect(snake[i].x,snake[i].y,box,box);

    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x,snake[i].y,box,box);
  }

  //draw food image
  ctx.drawImage(foodImg,food.x,food.y);

  //old head position
  let snakeX= snake[0].x;
  let snakeY=snake[0].y;

  //to go to which direction
  if(d=="LEFT")snakeX-=box;
  if(d=="UP")snakeY-=box;
  if(d=="RIGHT")snakeX+=box;
  if(d=="DOWN")snakeY+=box;

  //if the snake eats the food
  if(snakeX==food.x && snakeY==food.y){
    score++;
    eat.play();
    food={
      x:Math.floor(Math.random()*17+1)*box,
      y:Math.floor(Math.random()*15+3)*box
      }
      //if the snake eat the food we don't remove the tail
    }else{
      //remove the tail
      snake.pop();
    }
    //add a new head
    let newHead = {
      x:snakeX,
      y:snakeY
    }
    //game over condition
    if(snakeX<box || snakeX > 17*box || snakeY < 3*box || snakeY> 17*box || collision(newHead,snake)){
      clearInterval(game);
      dead.play();
      if(highscore !== null){
          if (score > highscore) {
              localStorage.setItem("highscore", score);
              document.getElementById('myImage2').style.display="block";
          }else{
            document.getElementById('myImage1').style.display="block";
          }
      }
      else{
          localStorage.setItem("highscore", score);
          document.getElementById('myImage2').style.display="block";
      }

    }

  //add the head to the beginning of the array
  snake.unshift(newHead);

  //show score
  ctx.fillStyle="white";
  ctx.font="45px Roboto Slab";
  ctx.fillText(score,2*box,1.6*box);
}

//call the draw function in every 100 milisecond
let game=setInterval(draw,100);





var x = document.getElementsByClassName("div1");
  x[0].innerHTML = "High score:<br>"+highscore;
