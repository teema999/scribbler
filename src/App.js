
import './App.css';

function PlayButton() {
  return (
    <button id="PlayButton">Play!</button>
  );
}

function HomeTitle(){
  const text = "Scribbler";
  const colors = ["red", "orange", "yellow", "green", "aqua", "blue", "indigo", "purple", "violet"]

  return (
    <h1 id="TitleText">
      {text.split('').map((char, index) => (
        <span key={index} style={{ color: colors[index % colors.length] }}>{char}</span>
      ))}
    </h1>
  );
}

function InputName(){
  return (
    <input id="InputUsername" type="text" placeholder="Enter Your Username" />
  );
}

function UserEnterInfo(){
  return (
    <div className="UserInfo">
      <InputName />
      <br></br>
      <PlayButton />
    </div>
  );
}


export default function App() {
  return (
    <div className="App">
      <HomeTitle />
      <br></br>
      <UserEnterInfo />
    </div>
  );
}

