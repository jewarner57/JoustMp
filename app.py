from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit, join_room
import os

# Server Config
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
socketio = SocketIO(app)

# Game Variables
rooms = {}


@app.route("/")
def home():
    return render_template('index.html')


@socketio.on('connect')
def socket_connect():
    """When the user connects to websocket server add them to
    a lobby and tell them which player they are left(0)/right(1)"""

    room_name = "testingroom"
    # user_name = "test username"
    client = request.sid
    join_room(client)

    if(rooms.get(room_name) is None):
        # if the lobby is empty then create a new lobby
        rooms[room_name] = [client]
        join_room(room_name)
        print("------------------------- ROOM CREATED")
        print(len(rooms.get(room_name)))
        emit('joinedAs', {"playerNumber": 0}, room=client)
    elif(len(rooms.get(room_name)) > 1):
        # if the user is joining a full lobby then send an error
        print("-------------------ROOM FULLL")
        print(len(rooms.get(room_name)))
        emit('error', {"data": "game is already full"})
    else:
        # if the lobby is half full then add user to lobby
        rooms[room_name].append(client)
        print("------------------- JOINED ROOM")
        print(len(rooms.get(room_name)))
        join_room(room_name)
        emit('joinedAs', {"playerNumber": 1}, room=client)


@socketio.on('playerMoved')
def playerMoved(position):
    emit('opponentMoved', {
        'x': position.get('x'),
        'y': position.get('y'),
        'ignore': position.get('ignore')},
        room="testingroom"
    )
    # print(f"x: {position.get('x')}, y: {position.get('y')}")


@socketio.on('disconnect')
def disconnect():
    """if a user disconnects
    check if they are in a room and remove them from it"""

    for room, users in rooms.items():
        for user in users:
            if user == request.sid:
                users.remove(user)


if __name__ == '__main__':
    socketio.run(app, debug=True)
    # cors_allowed_origins="*"
