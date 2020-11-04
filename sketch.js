
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var score
var gamestate = "play";

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400, 400);
  
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  score = 0;
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
}


function draw() {
  background("white");
  
  fill("black");
  text("Survival Time:" + score, 150, 20);
  
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(gamestate == "play"){
    score += Math.ceil(frameRate()/frameCount);
    
    if(keyDown("space")&&monkey.y >= 200){
      monkey.velocityY = -12;
    }
    monkey.velocityY += 0.8
    
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
    }
    if(obstaclesGroup.isTouching(monkey)){
      gamestate = "end";
    }
    createBanana();
    createObstacles();
  }
  
  if(gamestate == "end"){
    monkey.velocityY = 0;
    ground.velocityX = 0;
    bananaGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    
    bananaGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
  }
  
  monkey.collide(ground);
  
  drawSprites();
}

function createBanana(){
  if(frameCount%80 == 0){
    banana = createSprite(400, 100, 10, 10);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.velocityX = -4;
    banana.scale = 0.1;
    banana.lifetime = 100;
    bananaGroup.add(banana)
  }
}

function createObstacles(){
  if(frameCount%100 == 0){
    obstacles = createSprite(400, 315, 10, 10);
    obstacles.addImage(obstacleImage);
    obstacles.velocityX = -4;
    obstacles.scale = 0.2;
    obstacles.lifetime = 100;
    obstacles.setCollider("rectangle",0, 0, 330, 330)
    obstaclesGroup.add(obstacles);
  }
}


