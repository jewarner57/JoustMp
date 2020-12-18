from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit, join_room
import os
import secrets

# Server Config
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
socketio = SocketIO(app)


@app.route("/")
def home():
    return render_template('home.html')


@app.route("/createLobby", methods={"GET", "POST"})
def createLobby():
    if request.method == 'POST':
        username = request.form.get('username')
        color = request.form.get('color')
        lobbyCode = secrets.token_hex(6)

        context = {
            "username": username,
            "color": color,
            "lobbyCode": lobbyCode,
        }

        return render_template('lobby.html', **context)
    else:
        return render_template('home.html')


# Game Variables
rooms = {}


# SocketIO Listeners
@socketio.on('connect')
def socket_connect():
    """When the user connects to websocket server add them to
    a lobby and tell them which player they are left(0)/right(1)"""

    room_name = "testingroom"
    # user_name = "test username"
    client = request.sid
    join_room(client)

    if(rooms.get(room_name) is None or len(rooms.get(room_name)) == 0):
        # if the lobby is empty then create a new lobby
        rooms[room_name] = [{"client": client, "number": 0}]
        join_room(room_name)
        emit('joinedAs', {"playerNumber": 0}, room=client)

    elif(len(rooms.get(room_name)) > 1):
        # if the user is joining a full lobby then send an error
        emit('error', {"data": "game is already full"})

    elif(len(rooms.get(room_name)) == 1):
        # if the lobby is half full then add user to lobby as the opponent
        playernum = 1
        if(rooms.get(room_name)[0].get("number") == 1):
            playernum = 0

        rooms[room_name].append({"client": client, "number": playernum})
        join_room(room_name)

        emit('joinedAs', {"playerNumber": playernum}, room=client)

    else:
        emit('error', {'data': "error joining lobby"})


@socketio.on('playerMoved')
def playerMoved(position):
    """Update the player location if they moved"""
    roomName = "testingroom"

    emit('opponentMoved', {
        'x': position.get('x'),
        'y': position.get('y'),
        'ignore': position.get('ignore')},
        room=roomName
    )

    playerNum = position.get('playerNum')
    gameRoom = rooms.get(roomName)[playerNum]
    gameRoom["x"] = position.get('x')
    gameRoom["y"] = position.get('y')

    # print(f"x: {position.get('x')}, y: {position.get('y')}")


@socketio.on('playerCollision')
def playerCollision():
    roomName = "testingroom"
    room = rooms.get(roomName)

    if len(room) > 1:
        if(abs(room[0].get('x')-room[1].get('x')) < 40 and abs(room[0].get('y')-room[1].get('y')) < 40):
            if(room[0].get('y') > room[1].get('y')):
                print('Player 0 Wins')
                emit('resetPlayer', {"number": 0}, room=roomName)
            elif(room[0].get('y') < room[1].get('y')):
                print('Player 1 Wins')
                emit('resetPlayer', {"number": 1}, room=roomName)


@socketio.on('disconnect')
def disconnect():
    """if a user disconnects
    check if they are in a room and remove them from it"""

    for room, users in rooms.items():
        for user in users:
            if user.get("client") == request.sid:
                users.remove(user)


if __name__ == '__main__':
    socketio.run(app, debug=True)
