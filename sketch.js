
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var background1,backgroundImg
var monkeyDied

function preload(){
  
  monkeyDied=loadImage("sprite_7.png")
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  backgroundImg= loadImage("Monkey go Happy files/jungle.jpg")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(665,480)
  
  
  background1=createSprite(332,240,10,10);
  background1.addImage(backgroundImg)
  background1.velocityX=-5
  background1.scale=1.5
  
  monkey=createSprite(80,315,20,20);
monkey.addAnimation("moving", monkey_running);
monkey.scale=0.12

  ground=createSprite(400,485,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)
  ground.visible=false
  
  FoodGroup=new Group();
  obstacleGroup=new Group();
  
  score=0
  
}


function draw() {
background("white");
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX=0
    monkey.velocityY=0
    obstacleGroup.setVelocityXEach(0)
    FoodGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-1)
    FoodGroup.setLifetimeEach(-1)
    monkey.scale=0.1
    monkey.addImage(monkeyDied)
  }

  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }

    if (background1.x < 0){
      background1.x = background1.width/2;
    }

  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
  monkey.velocityY = monkey.velocityY + 0.8
  
  spawnObsticle(); 
   spawnFood();
  
monkey.collide(ground);
 
   
if(monkey.isTouching(FoodGroup)){
 score=score+5
 FoodGroup.destroyEach()
}

switch(score){
  case 10:monkey.scale=0.14;
  break
  case 20:monkey.scale=0.16;
  break
  case 30:monkey.scale=0.18;
  break
  case 40:monkey.scale=0.20;
  break
}

 drawSprites(); 

 text("Score:" +score,410,50)
  
  survivalTime=Math.ceil(frameCount/frameRate());
  text("survivalTime" +survivalTime,410,60)
}

function spawnObsticle(){
  if (frameCount % 150 === 0) {
  obstacle=createSprite(665,470,20,20);
  obstacle.y=Math.round(random(470,100))
  obstacle.addImage(obstacleImage);
  obstacle.velocityX=-4
  obstacle.scale=0.1999
    obstacle.lifetime=200
    obstacleGroup.add(obstacle)
    obstacle.collide(ground)
  }
}


function spawnFood(){
  if (frameCount % 100 === 0) {
    banana=createSprite(665,200,20,20);
  banana.addImage(bananaImage);
    banana.y=random(Math.round(200,220));
  banana.scale=0.199
  banana.velocityX=-4
    banana.lifetime=200
    FoodGroup.add(banana)
  }  
}

