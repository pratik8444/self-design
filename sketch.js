var bg;
var player,player_img
let enemy_img
let back;
let counter=0
var edges,bullets,bullets_img,enemygroup,bulletsgroup
var enemybullet_img,enemybullet,enemybulletgroup
var enemy
var abc=0,xyz=0
gameState='play';
function setup() {
   createCanvas(1000, 1000);
   
   back=createSprite(500,500,1000,1000);
   back.addImage(bg);
   back.scale=2.8
   back.velocityY=5

   player=createSprite(500,950,30,30)
   player.addImage(player_img);
   player.scale=0.4
bulletsgroup=new Group  ()
enemygroup=new Group ()
enemybulletgroup=new Group()
edges=createEdgeSprites()
   
}
function preload(){
  bg=loadImage('background.jpg');
  player_img=loadImage('game.png');
  enemy_img=loadImage('non-playing-character.png')
  bullets_img=loadImage('playing-character-bullets.png')
  enemybullet_img=loadImage('non_playing_xyz.png')
}

function draw() {
  background('white');
  if(gameState==='play'){
    if (keyDown(RIGHT_ARROW)){
      player.x+=10
    }
    if (keyDown(LEFT_ARROW)){
      player.x-=10
    }
    if (keyDown('space')){
      fireBullet()
    }
    if (back.y>600){
      back.y=height/2
    }
    spawnEnemy();
    if(bulletsgroup.isTouching(enemygroup)){
    
      score ()
    }
    if(enemybulletgroup.isTouching(player)||enemygroup.isTouching(player)){
      gameState='end'
    }

  }else if(gameState==='end'){
    enemybulletgroup.setVelocityYEach(0)
    enemygroup.setVelocityYEach(0)
    bulletsgroup.setVelocityYEach(0)
    back.velocityY=0
    textSize(50)
   text('gameEnd',500,500)
  }
  

 

  
 // if(enemybullet.isTouching(bullets)){
   // enemybullet.remove()
  //}
  
  player.collide(edges[0])
  player.collide(edges[1])
  enemyBullets()
  drawSprites();
  textSize(50)
  fill('red')
  text('score: '+counter,50,50) 
 
 //console.log(enemy.x)
}
function spawnEnemy(){
  if(frameCount%100==0){
     enemy=createSprite(Math.round(random(100,900)),-10,20,20)
    enemy.addImage(enemy_img)
    enemy.velocityY=2
    enemy.scale=0.5
    enemygroup.add(enemy)
   abc=enemy.x
   xyz=enemy.y
   console.log(abc)
   enemygroup.setLifetimeEach(200)
   
  }
}
function fireBullet(){
  bullets=createSprite(player.x,player.y-110,20,20)
  bullets.addImage(bullets_img)
  bullets.velocityY=-2
  bullets.scale=0.3
  bulletsgroup.add(bullets)
}

function enemyBullets(){
  if(frameCount % 40===0) {
    enemybullets=createSprite(abc,xyz+50,20,20)
    enemybullets.addImage(enemybullet_img)
    enemybullets.velocityY=4
    enemybullets.scale=0.4 
    enemybulletgroup.add(enemybullets)
  }
}
function score(){
counter+=1
}