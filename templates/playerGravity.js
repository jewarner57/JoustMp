function playerGravity() {
    
    //move by player 1 velocity
    if(Math.abs(player1.xVel) > 0.1) {
        player1.x += player1.xVel;
    }
    player1.y += player1.yVel;
    
    //move by player 2 velocity
    if(Math.abs(player2.xVel) > 0.1) {
        player2.x += player2.xVel;
    }
    player2.y += player2.yVel;
    
    //player 1 physics
    if(player1.y < 474) {
        player1.yVel += 0.3;
    }
    if(player1.y > 474 && player1.yVel > 0) {
        player1.yVel *= -0.5
        player1.canJump = true;
    }
    
    if(player1.xVel > 0) {
        player1.xVel -= 0.1;
    }
    else if(player1.xVel < 0) {
        player1.xVel += 0.1;
    }
    
    //player 2 physics
    if(player2.y < 474) {
        player2.yVel += 0.3;
    }
    if(player2.y > 474 && player2.yVel > 0) {
        player2.yVel *= -0.5
        player2.canJump = true;
    }
    
    if(player2.xVel > 0) {
        player2.xVel -= 0.1;
    }
    else if(player2.xVel < 0) {
        player2.xVel += 0.1;
    }
}
