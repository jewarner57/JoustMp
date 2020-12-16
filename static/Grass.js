function Grass(x, y, xVelocity, yVelocity) {
    
    this.xPos = x;
    this.yPos = y;
    
    this.startPosX = x;
    this.startPosY = y;
    
    this.xVel = xVelocity;
    this.yVel = yVelocity;

    this.active = true;
    
    this.display = function() {
        
        this.xPos += this.xVel;
        this.yPos += this.yVel;
        
        fill(90, 200, 20);
        rect(this.xPos, this.yPos, 4, 4);
        
        if(this.yPos > 550) {
             this.active = false;   
        }
        
        if(this.yPos < 550) {
            this.yVel += 1;
        }
        else {
            this.yVel = 0;
        }   
    }
}