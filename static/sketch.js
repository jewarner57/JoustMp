let player1 = {
    x : 100, 
    y : 300,
    xVel : 0,
    yVel : 0,
    canJump : false,
    score : 1000,
    bulletFired : false,
    bulletX : 130,
    bulletY : 100
}
    
let player2 = {
    x : 700,
    y : 300,
    xVel : 0,
    yVel : 0,
    canJump : false,
    score : 1000,
    bulletFired : false,
    bulletX : 130,
    bulletY : 100
}

function setup() {
    let cnv = createCanvas(800, 500);
    // center canvas on screen
    cnv.style('display', 'block')
    cnv.parent('gameContainer');


    socket = io.connect('http://localhost:5000/')

    // socket.on('recieveID', setPlayerID)
    // socket.on('sendBikeData', updateEnemyBike)
    // socket.on('playerDisconnected', removeDisconnectedPlayers)
}

function draw() {

    //create background colors
    background(0, 100, 0);
    noStroke();
    fill(0, 0, 100);
    rectMode(CORNER);
    rect(0, 0, 400, 500);
    
    //draw bullets if necessary
    if(player1.bulletFired === true || player2.bulletFired === true) {
        moveBullets();

    }
    
    //player one
    rectMode(CENTER);
    strokeWeight(2.5);
    stroke(0, 50, 200);
    fill(0, 30, 255);
    rect(player1.x, player1.y, 50, 50);
    
    //player two
    rectMode(CENTER);
    strokeWeight(2.5);
    stroke(0, 200, 50);
    fill(0, 255, 30);
    rect(player2.x, player2.y, 50, 50);
    
    strokeWeight(1);
    text(player2.score, 750, 50);
    
    fill(20, 70, 255);
    stroke(0 ,50, 200);
    strokeWeight(1);
    text(player1.score, 50, 50);
    
    //exerts gravity on the player -_- 
    playerGravity();
    
    //check if keys are pressed
    checkKeys();
    
    //check if cubes are touching
    killConditionTest();
    
    //create score on screen
    textAlign(CENTER);
    
    //change points
    modifyPoints();
}

function resetPlayer(player) {
    if(player === 1){
        player1.x = 100;
        player1.y = 300;
        player1.xVel = 0;
        player1.yVel = 0;
        player1.canJump = false;
    }
    else if(player === 2) {
        player2.x = 700
        player2.y = 300
        player2.xVel = 0;
        player2.yVel = 0;
        player2.canJump = false;
    } 
}

function modifyPoints() {
    
    if(player1.x > width/2) {
        player2.score -= 1;
    }
    if(player2.x < width/2) {
        player1.score -= 1;
    }
    
    if(player1.score < 0) {
        fill(0, 255, 30);
        noStroke();
        textSize(25);
        textAlign(CENTER);
        text("Green Wins", width-200, height/2);
        noLoop();
        
    }
    if(player2.score < 0) {
        noStroke();
        fill(0, 255, 300)
        textSize(25);
        textAlign(CENTER);
        text("Blue Wins", 200, height/2);
        noLoop();
    }
}