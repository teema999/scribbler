import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function PlayButton({ onClick, disabled }) {
  return (
    <button id="PlayButton" onClick={onClick} disabled={disabled}>Play!</button>
  );
}

function HomeTitle() {
  const text = "Scribbler";
  const colors = ["red", "orange", "yellow", "green", "aqua", "blue", "indigo", "purple", "violet"];

  return (
    <h1 id="TitleText">
      {text.split('').map((char, index) => (
        <span key={index} style={{ color: colors[index % colors.length] }}>{char}</span>
      ))}
    </h1>
  );
}

function InputName({ username, setUsername }) {
  return (
    <input
      id="InputUsername"
      type="text"
      placeholder="Enter Your Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
  );
}

function UserEnterInfo({ username, setUsername, onPlay }) {
  return (
    <div className="UserInfo">
      <InputName username={username} setUsername={setUsername} />
      <br />
      <PlayButton onClick={onPlay} disabled={!username} />
    </div>
  );
}

function Canvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Fill the canvas with a white background
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    function startDrawing(e) {
      context.beginPath();
      context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      canvas.addEventListener('mousemove', draw);
    }

    function stopDrawing() {
      canvas.removeEventListener('mousemove', draw);
    }

    function draw(e) {
      context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      context.stroke();
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
    };
  }, []);

  return (
    <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid black' }}></canvas>
  );
}

function Chat({ username, users, setUsers }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  function handleSend() {
    if (input.trim()) {
      const newMessage = `${username}: ${input.trim()}`;
      setMessages([...messages, newMessage]);
      setInput('');

      // Update the user's score
      setUsers(users.map(user => 
        user.name === username ? { ...user, score: user.score + 1 } : user
      ));
    }
  }

  return (
    <div className="Chat">
      <div className="ChatMessages">
        {messages.map((msg, index) => (
          <div key={index} className="ChatMessage">{msg}</div>
        ))}
      </div>
      <div className="ChatInput">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

function Leaderboard({ users }) {
  return (
    <div className="Leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name}: {user.score}</li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);

  function handlePlay() {
    if (username && !users.find(user => user.name === username)) {
      setUsers([...users, { name: username, score: 0 }]);
    }
    setIsPlaying(true);
  }

  return (
    <div className="App">
      <HomeTitle />
      <br />
      {isPlaying ? (
        <div className="GameArea">
          <Leaderboard users={users} />
          <Canvas />
          <Chat username={username} users={users} setUsers={setUsers} />
        </div>
      ) : (
        <UserEnterInfo
          username={username}
          setUsername={setUsername}
          onPlay={handlePlay}
        />
      )}
    </div>
  );
}
