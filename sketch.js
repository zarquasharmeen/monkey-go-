var PLAY = 1;
var END = 0;
var gameState = PLAY;


var monkey, backImage, monkey_running;

var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var restart, gameover, restartImage, gameoverImage;
var score =0;
var size = 0
var lives=1;
                                     
function preload(){                                   
   backImage = loadImage("jungle.jpg");
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("stone.png");
  
  restartImage = loadImage("restart.png");
  gameoverImage = loadImage("Gameover.png")
 
}


function setup() {
  createCanvas(600, 400)

  
  FoodGroup=new Group();
  obstacleGroup=new Group();
  
  bg = createSprite(0,0,600,400);
  bg.addImage(backImage);
  bg.velocityX=-2;
  bg.scale=1.5;
  monkey = createSprite(50, 156, 10, 10);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  
  ground = createSprite(400, 250, 900, 10);
  ground.velocityX=-4;
  ground.x = ground.width/2;
  ground.visible=false; 
  console.log(ground.x)
  
  restart = createSprite(200, 200, 200, 200);
  restart.addImage(restartImage);
  restart.scale=0.08;
  
  gameover = createSprite(200, 130, 150, 150);
  gameover.addImage(gameoverImage);
  gameover.scale=0.4;
}

function draw() {
  background(220);
  
  
  monkey.collide(ground);
  
  if (gameState===PLAY){
    if (ground.x < 50){
      ground.x = ground.width/2;
    }

    camera.position.x = monkey.x
    camera.position.y = monkey.y

  
  
  if (bg.x < 50){
      bg.x = bg.width/2;
    }
  
  
  if (keyDown("SPACE")&& monkey.y >= 215) {
    monkey.velocityY=-12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
    
  spawnBananas();
  spawnObstacles();
  
  if (FoodGroup.isTouching(monkey)) {
    score= score+2;
    FoodGroup.destroyEach();
    monkey.scale = monkey.scale+0.001;
    size = monkey.scale
  }
    
    restart.visible= false;
    gameover.visible= false;
    
  
    
   if(obstacleGroup.isTouching(monkey)) {   
      obstacleGroup.destroyEach(); 
       lives = lives - 1
     if (lives == 0)
       gameState = END;
     }
  }
    
    else if (gameState === END) {
      
      gameover.visible=true;
      restart.visible=true;
      
      //making background static
      bg.velocityX=0;
            

      obstacleGroup.destroyEach();
      FoodGroup.destroyEach();
      monkey.destroy();
    //destroying food and obstacle Groups and giving them negative lifetime
  
      obstacleGroup.setLifetimeEach(-1);
      obstacleGroup.setVelocityXEach(0);
      obstacleGroup.visible=false;

      FoodGroup.setLifetimeEach(-1);
      FoodGroup.setVelocityXEach(0);
      FoodGroup.visible=false;
  

      if(mousePressedOver(restart)){
        reset();
      }
      
    }
  
  

  
  drawSprites();
  
  stroke("orange");
  textSize(20);
  fill("orange");
  text("Score: " + score, 100, 100);
  
  stroke("orange");
  textSize(20);
  fill("orange");
  text("Lives: " + lives, 250, 100);
}

 function spawnObstacles() {
    
    if (frameCount % 300 === 0) {
      var obstacle = createSprite(500, 215, 20, 20);
      obstacle.addImage("obstacle", obstaceImage);
      
      obstacle.velocityX =-10;
      
      obstacle.scale =0.15;
      
      obstacleGroup.add(obstacle);
      
    }   
 }

function spawnBananas() {
    
    if (frameCount % 160 === 0) {
      var banana = createSprite(1000, 200, 200, 200);
      banana.addImage("banana", bananaImage);
      
      banana.y=Math.round(random(130, 170));
      
      banana.velocityX=-6;
      
      banana.scale=0.05;
      
      FoodGroup.add(banana);
    }
}

function reset(){

  gameState=PLAY;
  
  //creating monkey sprite
  monkey = createSprite(50, 156, 10, 10);
  //adding running animation to monkey
  monkey.addAnimation("moving", monkey_running);
  //scaling the size of monkey
  monkey.scale = 0.1;
  
  bg.velocityX = -2;
  

  //making gameOver and restart invisible
  gameover.visible=false;
  restart.visible=false;
  
  
  //resetting the score and lives
  score=0;
  lives=3;
  
} 