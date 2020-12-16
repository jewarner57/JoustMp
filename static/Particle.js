function Particle(x, y, xVelocity, yVelocity, r, b) {
  
    this.xPos = x;
    this.yPos = y;
    
    this.xVel = -xVelocity/5;
    this.yVel = -yVelocity/5;
    
    this.red = r-100;
    this.blue = b-100;

    this.active = true;
    
    this.display = function() {
        
        this.xPos += this.xVel;
        this.yPos += this.yVel;
        
        fill(this.red, 0, this.blue);
        rect(this.xPos, this.yPos, 20, 20);
        
        if(this.xPos > 900 || this.xPos < 0 || this.yPos > 600 || this.yPos < 0 || (this.xVel === 0 && this.yVel === 0)) {
             this.active = false;   
        }
        
        if(this.red > 0) {
            
            if(Math.abs(this.xPos-player1.xPos) < 30 && Math.abs(this.yPos-player1.yPos) < 30) {
                player2Score += 10;
                this.active = false;
            }
            
        }
        else if(this.blue > 0) {
            
            if(Math.abs(this.xPos-player2.xPos) < 30 && Math.abs(this.yPos-player2.yPos) < 30) {
                player1Score += 10;
                this.active = false;
            }
            
        }
    }
}