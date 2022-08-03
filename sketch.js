let soundRect;
let soundScore;
let soundTrack;

let psXBol = 0;
let psYBol = 0;
let dimBol = 26;
let psXDiameterBol = 0;
let psYDiameterBol = 0;
let radiusBol = dimBol / 2;
let vXBol = 6;
let vYBol = 6;

let psYIniRect = 0;
let widthRect = 10;
let heightRect = 100;

let psXRectPlayerOne = 0;
let psYRectPlayerOne = 0;

let psXRectPlayerTwo = 0;
let psYRectPlayerTwo = 0;
let vYPlayerTwo = 1;

let up = 0;
let down = 0;

let scorePlayerOne = 0, scorePlayerTwo = 0;
let timer = 0;

let hit = false;


function preload(){
  
   soundTrack = loadSound("//sounds//trilha.mp3");
   soundRect = loadSound("//sounds//raquetada.mp3");
   soundScore = loadSound("//sounds//ponto.mp3");
}

function setup() {
  
  soundTrack.loop();
  
  createCanvas(600, 400);
  
  setSettingsDefault();
  
}


function checkCollideRect(rectX, rectY, rectWidth, rectHeight, bolX, bolY, bolRadius){
 
  hit = collideRectCircle(rectX, rectY, rectWidth, rectHeight, bolX, bolY, bolRadius);
  
  if(hit){
    
    vXBol *= -1;
    
    soundRect.play();
    
  }
  
}
  
function checkCollideBorder(){
  
    //Invert direction bol - Y
    if(psYBol < radiusBol || psYBol > (height - radiusBol)){

      vYBol *= -1;
    }
}  
  

function setSettingsDefault(){
  
  //Bol
  psXBol = width / 2;
  psYBol =  height / 2;
    
  //Rects
  psXRectPlayerOne = 10;
  psXRectPlayerTwo = width - 20;
  
  psYIniRect = (height - heightRect) /2;
  psYRectPlayerOne = psYRectPlayerTwo = psYIniRect;
  
  psXDiameterBol = 0;
  psYDiameterBol = 0;
  
}

function showScore(){
  
  textSize(32); 
  text(`${scorePlayerOne} x ${scorePlayerTwo}`, 250, 30);
  
}

function showBol(){
  
  circle(psXBol, psYBol, dimBol);
  
}

function moveBol(){
  
    psXBol += vXBol;
    psYBol += vYBol;
}

function showRects(){
  
    //rect playerOne green
    fill(0,168,64);
    rect(psXRectPlayerOne, psYRectPlayerOne, widthRect, heightRect);

    //rect playerTwo red
    fill(255,0,0);
    rect(psXRectPlayerTwo, psYRectPlayerTwo, widthRect, heightRect);
}

function updateDiamaterBol(){
  
    psXDiameterBol = psXBol - radiusBol;
    psYDiameterBol = psYBol - radiusBol;
}

function updateRectPlayerTwo(){
  
  vYPlayerTwo = psYBol - psYRectPlayerTwo - heightRect / 2 - 50;
  psYRectPlayerTwo  += vYPlayerTwo;
}

function draw() {
  
  //Set background
  background(0);
  
  //Set color white in bol e score
  fill(255,255,255); 

  showScore();
  
  moveRect();
       
  if(isGoal() == -1 && timer == 0){
          
    showBol();
             
    moveBol();
    
    checkCollideBorder();
    
   // updateRectPlayerTwo();
    
    updateDiamaterBol();

    showRects();
  
    //invertDirectionBol();    
    checkCollideRect(psXRectPlayerOne,psYRectPlayerOne,widthRect,heightRect,psXBol,psYBol,radiusBol);
    
    checkCollideRect(psXRectPlayerTwo,psYRectPlayerTwo,widthRect,heightRect,psXBol,psYBol,radiusBol);
    
  }else{
        
        timer++;
         
        if(timer == 1){
                  
          frameRate(10);
          
          updateScore(isGoal());
          
          soundScore.play();
          
        }else if(timer > 20){
          
          setSettingsDefault();
          timer = 0;
          frameRate(60);
          
        } 
  }

}

function updateScore(goal){
   
  if(goal == 0){
    
     scorePlayerTwo++;
    
  }else if(goal == 1){
    
    scorePlayerOne++;
  }
  
}

// a custom 'sleep' or wait' function, that returns a Promise that resolves only after a timeout
function sleep(millisecondsDuration)
{
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}


function moveRect(){
  
  if(keyIsDown(87)){
    
      if((psYRectPlayerOne - 10) > 0)
        psYRectPlayerOne -= 10;
    else
        psYRectPlayerOne = 0;
    
  }else if(keyIsDown(83)){
    
        if(((psYRectPlayerOne + heightRect) + 10) < height)
        psYRectPlayerOne += 10;
    else
        psYRectPlayerOne = height - heightRect;
  }
  
  
   if(keyIsDown(UP_ARROW)){
    
      if((psYRectPlayerTwo - 10) > 0)
        psYRectPlayerTwo -= 10;
    else
        psYRectPlayerTwo = 0;
    
  }else if(keyIsDown(DOWN_ARROW)){
    
        if(((psYRectPlayerTwo + heightRect) + 10) < height)
        psYRectPlayerTwo += 10;
    else
        psYRectPlayerTwo = height - heightRect;
  }
}


function isGoal(){

  if(psXDiameterBol < 1 && psYDiameterBol > 0){
    
    return 0;
  
  }else if(psXBol > (width - radiusBol) &&  psYDiameterBol > 0){
  
    return 1;
  
  }else{
    
    return -1;
    
  }
  
}


/* Estou utilizando a função da biblioteca p5. collide para verificar a colisão
function invertDirectionBol(){
  
       //Invert Bol Rect - 1
     if((psXBol - radiusBol < (psXRectPlayerOne + widthRect)) && 
         (psYBol >= psYRectPlayerOne && 
         psYBol <= (psYRectPlayerOne + heightRect))){

        vXBol *= -1;    
    }

    //Invert Bol Rect - 2
    if((psXBol + radiusBol > psXRectPlayerTwo) && 
       (psYBol + radiusBol >= psYRectPlayerTwo) && (psYBol - radiusBol <= psYRectPlayerTwo + heightRect)){
      
      vXBol *= -1;
    }

    //Invert direction bol - Y
    if(psYBol < radiusBol || psYBol > (height - radiusBol)){

      vYBol *= -1;
    }
}*/



