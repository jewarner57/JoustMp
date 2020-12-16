from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import os

# Server Config
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
socketio = SocketIO(app)


@app.route("/")
def home():
    return render_template('index.html')


@socketio.on('connect')
def test_connect():
    emit('my response', {'data': 'Connected'})


if __name__ == '__main__':
    socketio.run(app, debug=True)
    # cors_allowed_origins="*"
