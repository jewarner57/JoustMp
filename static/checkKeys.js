function checkKeys() {

    //player 1 movement
    if(keyIsDown(87) && player1.canJump === true) {
        player1.yVel = -13;
        player1.canJump = false;
    }
    if(keyIsDown(65)) {
        player1.xVel -= 0.3
    }
    if(keyIsDown(68)) {
        player1.xVel += 0.3
    }
    if(keyIsDown(83) && player1.y < 474) {
        player1.yVel += 1
    }
    //player1 fire bullet
    if(keyIsDown(69) && player1.bulletFired === false) {
        player1.bulletFired = true;
        player1.bulletX = player1.x;
        player1.bulletY = player1.y;
        
    }
    
    //player 2 movement
    if(keyIsDown(UP_ARROW) && player2.canJump === true) {
        player2.yVel = -13;
        player2.canJump = false;
    }
    if(keyIsDown(DOWN_ARROW) && player2.y < 474) {
        player2.yVel += 1;
    }
    if(keyIsDown(LEFT_ARROW)) {
        player2.xVel -= 0.3
    }
    if(keyIsDown(RIGHT_ARROW)) {
        player2.xVel += 0.3
    }
    //player2 fire bullet
    if(keyIsDown(32) && player2.bulletFired === false) {
        player2.bulletFired = true;
        player2.bulletX = player2.x;
        player2.bulletY = player2.y;
        
    }
}