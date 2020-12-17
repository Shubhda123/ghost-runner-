var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState="play"

function preload()
{
   towerImg = loadImage("tower.png");
   doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
}
function setup(){
  createCanvas(600,600);
   tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  
   climbersGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
  
   invisibleBlockGroup = new Group();
  }

function draw()
{
    background(0);
  if(gameState==="play")
    {
  
  if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.2
  
  if(tower.y > 400){
      tower.y = 300
    }
  spawnDoors();
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
  drawSprites();
    }
  if(gameState==="end")
    {
       fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
    }
}
function spawnDoors() {
  if (frameCount % 240 === 0) {
    var door = createSprite(200, 50);
    door.x = Math.round(random(120,400));
    door.addImage(doorImg);
    door.velocityY = 1;
    doorsGroup.add(door);
    
    var climber = createSprite(200,100);
    climber.x = door.x;
     climber.addImage(climberImg);
    climber.velocityY = 1;
     climbersGroup.add(climber);
    
    ghost.depth = door.depth;
    ghost.depth +=1;
    
    var invisibleBlock = createSprite(200,100);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
     invisibleBlockGroup.add(invisibleBlock);
    
  }
}
  