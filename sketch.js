
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
 
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();
  
}


function draw() {
 background(225)
  
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  if(keyDown("space")){
   monkey.velocityY=-12; 
  }
  
  monkey.velocityY=monkey.velocityY+0.8;
  
  monkey.collide(ground)
  
  if(obstaclesGroup.isTouching(monkey)){
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
  }
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("SurvivalTime: "+ survivalTime,100,50);
  
  spawnObstacles();
  spawnBananas();
  
  drawSprites();
 }

function spawnBananas(){
  if (frameCount % 80 === 0) {
    banana = createSprite(400,50,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale=0.1
    banana.velocityX = -3;
    
    banana.lifetime = 135;
    bananaGroup.add(banana);
  }
}
function spawnObstacles(){
  if (frameCount % 300 === 0) {
    obstacle = createSprite(400,335,10,40);
    obstacle.y = Math.round(random(335,340));
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2
    obstacle.velocityX = -3;
    obstacle.collide(ground)
    obstacle.lifetime = 135;
    obstaclesGroup.add(obstacle);
  }
}