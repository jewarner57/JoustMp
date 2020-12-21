## TODO

### Do

* add conditional emiting on client
  * client only sends data if the data is different than the last data it sent

* add character limit to usernames

* add a death animation to make it clear who died

* make gravity handled by the server?
  * is this the best thing to do?
  * how can I prevent cheating from being so easy

* Make game over condition set by the server  

* make playerCollision in server only run once on a collision

### Doing
* fix bug where player 1 starts with a high upward velocity

### Done
* deploy to heroku
* Make scores set by the server
* display message if opponent disconnects
* display character usernames in game
* change player colors to the colors they choose in the menu
* flash error when user tries to join a full lobby
* only start the game once both players have connected
* create lobby page
  * allow user to wait for an opponent
  * allow user to send a code to someone to allow them to join the lobby
* players can choose their color in the lobby
* create start page 
  * allow user to set username before start
  * have a createlobby button
* move collision detection verification to server
* Swap spawn point if the client is player 2
* remove players from room when they disconnect
* cap framerate at 30 to reduce server load
* get game canvas working
* connect socketio to client
* make server determine which side the user is on when they join
* opposite players move on both screens

### Icebox
* add back player particles that deal damage if the opponent touches them
* create a small game on the lobby page so users can practice while they wait
* add in game chat
* add a restart button to the lobby