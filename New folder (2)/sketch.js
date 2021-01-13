
var knife, knifeImage, enemy, enemyImage;
var gameOver, gameOverImage;
var fruit1, fruit2, fruit3, fruit4;

var fruitGroup;
var enemyGroup;

var score=0;

var gameState = "play";

function preload(){
  
  knifeImage = loadImage("sword.png");
 
  enemyImage = loadAnimation("alien1.png", "alien2.png");
  
  gameOverImage = loadImage("gameover.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
}

function setup(){
  createCanvas(500,500);
  
  knife = createSprite(40,200,20,20);
  knife.addImage(knifeImage);
  knife.scale = 0.7;
  knife.setCollider("rectangle", 0,0,40,40);
  
  score = 0;
  
  fruitGroup = new Group();
  enemyGroup = new Group();
  
}

function draw(){
  background("lightblue");
  
  if (gameState === "play"){
    knife.x = mouseX;
    knife.y = mouseY;
  
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      score=score+2
      }
    if (enemyGroup.isTouching(knife)){
        gameState = "end";
      }
    
    fruits();
    enemy();
  }
  
  if (gameState === "end"){
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    
    enemyGroup.setVelocityXEach(0);
    fruitGroup.setVelocityXEach(0);
    
    knife.addImage(gameOverImage);
    knife.x = 200;
    knife.y = 200;
  }
  drawSprites();
  
  textSize(20);
  fill("black");     
  text("Score : " + score, 270, 30);
}

function fruits(){
  if(frameCount%80===0){
    var fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    r=Math.round(random(1,4));
    if (r == 1){
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y = Math.round(random(50,340));
    
    fruit.velocityX = -7;
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit);
  }
}

function enemy(){
  if(frameCount%200===0){
    var enemy=createSprite(400,200,20,20);
    enemy.addAnimation("moving", enemyImage);
    enemy.y=Math.round(random(100,300));
    enemy.velocityX = -8;
    enemy.setLifetime = 50;
    
    enemyGroup.add(enemy);
  }
}