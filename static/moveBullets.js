function moveBullets() {
    
    if(player1.bulletFired === true) {
        fill(0, 30, 255);
        rect(player1.bulletX, player1.bulletY, 20, 10);
        player1.bulletX -= 20;
        
        if(player1.bulletX < 0) {
            player1.bulletFired = false;
        }
    }
    if(player2.bulletFired === true) {
        fill(0, 255, 30);
        rect(player2.bulletX, player2.bulletY, 20, 10);
        player2.bulletX += 20;
        
        if(player2.bulletX > width) {
            player2.bulletFired = false;
        }
    }
}