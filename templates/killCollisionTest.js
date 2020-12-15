function killConditionTest() {
    if(Math.abs(player1.x-player2.x) < 50 && Math.abs(player1.y-player2.y) < 50) {
        if(player2.x > 400) {
            resetPlayer(1);
        }
        if(player2.x < 400) {
            resetPlayer(2, player2.x);
        }
    }
    
    if(player1.bulletFired === true || player2.bulletFired === true) {
        if(Math.abs(player1.bulletX-player2.x) < 30 && Math.abs(player1.bulletY-player2.y) < 30) {
            resetPlayer(2);
            player1.bulletFired = false;
        }
        if(Math.abs(player2.bulletX-player1.x) < 30 && Math.abs(player2.bulletY-player1.y) < 30) {
            resetPlayer(1);
            player2.bulletFired = false;
        }
    }
    
    if(player1.x < -25 || player1.x > 825 || player1.y < -25) {
        resetPlayer(1);
    }
    if(player2.x < -25 || player2.x > 825 || player2.y < -25) {
        resetPlayer(2);
    }
}