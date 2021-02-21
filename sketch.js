var PLAY = 1;
var END = 0;
var gS = PLAY;
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground, gi
var sT;



function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 600);
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(300, 590, 900, 20);
  ground.velocityX = -1

  FoodGroup = createGroup();
  obstaclesGroup = createGroup();
}


function draw() {
  background("lightBlue");
  stroke("white");
  textSize(60);
  fill("white");
  stroke("black");
  fill("black");
  sT = Math.ceil(frameCount / frameRate());
  text("Survival Time: " + sT,10,65)
  monkey.velocityY = monkey.velocityY + 2.4;
  monkey.collide(ground);
  console.log(ground.width + " --- " + ground.x);
  if (gS == PLAY) {
    if (ground.x < 200) {
      ground.x = ground.width / 2;
    }
    if (keyDown("space") && monkey.y >= 547) {
      monkey.velocityY = -35;
    }
    food();
    obstacles();
  }
  drawSprites();
}

function food() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600, 120, 40, 10);
    banana.y = Math.round(random(520, 300));
    banana.addImage(bananaImage);
    banana.scale = 0.08;
    banana.velocityX = -3;
    banana.lifetime = 220;
    FoodGroup.add(banana);

  }
}

function obstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600, 550, 10, 40);
    obstacle.velocityX = -6 //(6 + score / 100);

    //generate random obstacles
    var rand = 1;
    switch (rand) {
      case 1:
        obstacle.addImage(obstacleImage);
        break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.25;
    obstacle.lifetime = 100;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}