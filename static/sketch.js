///////////

var player1 = new Player(1);
var player2 = new Player(2);

var player1Score = 0;
var player2Score = 0;

let socket = ""

this.particleList = [];
this.grassParticleList = [];

function setup() {
    let cnv = createCanvas(900, 600);
    // center canvas on screen
    cnv.style('display', 'block')
    cnv.parent('gameContainer');


    socket = io.connect('http://localhost:5000/')

    socket.on('connect', () => {
        console.log(socket.connected)
        console.log(socket.id)

        id=socket.id
    })

    socket.on('opponentMoved', (position) => {
        if(position.ignore !== socket.id) {
            player2.xPos = position.x
            player2.yPos = position.y
        }
    })

    socket.on('joinedAs', (playerChoice) => {
        // set if the player is the left or right side
        if(playerChoice.playerNumber === 0) {
            var player1 = new Player(1);
            var player2 = new Player(2);
        }
        else {
            var player1 = new Player(2);
            var player2 = new Player(1);
        }
        
    })

    socket.on('error', (error) => {
        console.log(error.data)
    })
}

function draw() {

    socket.emit('playerMoved', {"x": player1.xPos, "y": player1.yPos, "ignore": socket.id})

    rectMode(CENTER);
    background(0);
    noStroke();

    fill(player1.r, 0, player1.b);
    player1.display();
    
    fill(player2.r, 0, player2.b);
    player2.display();

    //bottom platform
    rectMode(CORNER);
    fill(190, 90, 20);
    rect(-10, height-50, width+10, 50);
    fill(90, 200, 20);
    rect(-10, height-50, width+10, 10);
    
    fill(0);
    text(player1Score, 40, height-15);
    text(player2Score, width-40, height-15);
    
    if(player1.yPos < -20) {
        player1.reset();
        player2Score += 100;
    }
    if(player2.yPos < -20) {
        player2.reset();
        player1Score += 100;
    }
    
    if(Math.abs(player1.xPos-player2.xPos) < 40 && Math.abs(player1.yPos-player2.yPos) < 40)  {
        if(player1.yPos > player2.yPos && (player1.b == 255 && player2.r == 255)) {
            player1.reset();
            player2Score += 100;
        }
        else if(player2.yPos > player1.yPos && (player1.b == 255 && player2.r == 255)) {
            player2.reset();
            player1Score += 100;
        }
        else if(player2.yPos === player1.yPos && (player1.b == 255 && player2.r == 255)) {
            player1.reset();
            player2.reset();
        }
    }
    
    if(player1Score >= 1000 && player2Score >= 1000) {
        fill(255);
        text('It Was a tie!', width/2, height/2);
    }
    else if(player1Score >= 1000) {
        fill(0, 0, 255);
        text("Player 1 Wins", width/2, height/2);
    }
    else if(player2Score >= 1000) {
        fill(255, 0, 0);
        text("Player 2 Wins", width/2, height/2);
    }
    
    for(var i = 0; i < grassParticleList.length; i++) {
        
        if(grassParticleList[i].active) {
            grassParticleList[i].display();
        }
        else {
            grassParticleList[i].delete;
        }
    }
}



function keyPressed() {
    if(keyCode == UP_ARROW) {

       player1.yVel -= 3;
       player1.newParticle();
       player1.b = 255;

       if(keyIsDown(RIGHT_ARROW) && player1.xVel < 14) {
           player1.xVel += 2;
       }
       else if(keyIsDown(LEFT_ARROW) && player1.xVel > -14) {
           player1.xVel -= 2;
       }
    }

    if(keyCode == RIGHT_ARROW && player1.yPos > height-73 && player1.xVel < 0) {
        player1.xVel += 2;
        
        for(var i = 0; i < 10; i++) {
            grassParticleList[grassParticleList.length] = new Grass(player1.xPos-20, player1.yPos+20, player1.xVel-(Math.random()*3+1), -Math.random()*10);
        }
    }
    
    if(keyCode == LEFT_ARROW && player1.yPos > height-73 && player1.xVel > 0) {
        player1.xVel -= 2;
        
        for(var i = 0; i < 10; i++) {
            grassParticleList[grassParticleList.length] = new Grass(player1.xPos+20, player1.yPos+20, player1.xVel+(Math.random()*3+1), -Math.random()*10);
        }
    }
    
    
    
    if(keyCode == 87) {

       player2.yVel -= 3;
       player2.newParticle();
       player2.r = 255;

       if(keyIsDown(68) && player2.xVel < 14) {
           player2.xVel += 2;
       }
       else if(keyIsDown(65) && player2.xVel > -14) {
           player2.xVel -= 2;
       }
    }
    
    if(keyCode == 68 && player2.yPos > height-73 && player2.xVel < 0) {
        player2.xVel += 2;
        
        for(var i = 0; i < 10; i++) {
            grassParticleList[grassParticleList.length] = new Grass(player2.xPos-20, player2.yPos+20, player2.xVel-(Math.random()*3+1), -Math.random()*10);
        }
    }
    
    if(keyCode == 65 && player2.yPos > height-73 && player2.xVel > 0) {
        player2.xVel -= 2;
        
        for(var i = 0; i < 10; i++) {
            grassParticleList[grassParticleList.length] = new Grass(player2.xPos+20, player2.yPos+20, player2.xVel+(Math.random()*3+1), -Math.random()*10);
        }
    }
    
    
    
}
