function Player(playerNum) {
  
    this.xPos = 0;
    this.yPos = 0;
    
    this.xVel = 0;
    this.yVel = 0;

    this.startPosX = 0;
    this.startPosY = 0;

    this.r = 255;
    this.b = 255;

    
    if(playerNum === 1) {
        this.xPos = 250;
        this.yPos = 400;
    }
    else if(playerNum === 2) {
        this.xPos = 650;
        this.yPos = 400;
    }

    this.display = function() {

        rect(this.xPos, this.yPos, 40, 40);
        
        for(var i = 0; i < particleList.length; i++) {
            if(particleList[i].active === true) {
                particleList[i].display();
            }
            else {
                particleList[i].delete;
            }
        }
    }

    this.movePlayer = function() {

        this.xPos += this.xVel;
        this.yPos += this.yVel;

        if(this.xPos > 900 && this.xVel > 0) {
            this.xPos = -20;
        }
        else if(this.xPos < 0 && this.xVel < 0) {
            this.xPos = 920;
        }
        
    }
            
    this.newParticle = function() {
        particleList.push(new Particle(this.xPos, this.yPos, this.xVel, this.yVel, this.r, this.b));    
    } 
    
    this.reset = function() {
        
        this.xVel = 0;
        this.yVel = 0;
        
        if(playerNum === 1) {
            this.xPos = 250;
            this.yPos = 100;
            //this.b = 50;
        }
        else if(playerNum === 2) {
            this.xPos = 650;
            this.yPos = 100;
            //this.r = 50;
        }
        
    }
}



var timer = setInterval(lowerVelocity, 60);

function lowerVelocity() {
    if(gameLoaded) {
        if(player2.yPos < height-70) {
            player2.yVel += 0.5;
        }
        else if(player2.yPos + player2.yVel > height-70) {
            player2.yPos = height-70;
            if(player2.yVel > 1) {
                player2.yVel = player2.yVel*-1/5;
            }
            else {
                player2.yVel = 0;
            }
        }
        
        
        if(player1.yPos < height-70) {
            player1.yVel += 0.5;
        }
        else if(player1.yPos + player1.yVel > height-70) {
            player1.yPos = height-70;
            if(player1.yVel > 1) {
                player1.yVel = player1.yVel*-1/5;
            }
            else {
                player1.yVel = 0;
            }
        }
    }
}