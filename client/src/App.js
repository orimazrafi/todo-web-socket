import React from "react";
import "./App.css";
import io from "socket.io-client";
import { Form } from "./components/Form/Form";

const socket = io.connect("http://localhost:4000");

function App() {
  const [name, setName] = React.useState("");
  const [isName, setIsName] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);
  const handleSubmit = task => {
    socket.emit("task", { name, task });
  };

  const DisplayTasks = () =>
    tasks.map(({ name: publisher, task }) => (
      <div key={Math.random()}>
        <h4 className={name === publisher && "active"}>
          {" "}
          publisher: {publisher}
        </h4>
        <p>task: {task}</p>
        {name === publisher && (
          <button onClick={() => handleDelete({ name: publisher, task })}>
            delete
          </button>
        )}
      </div>
    ));

  const handleDelete = task => {
    const index = tasks.findIndex(
      t => t.name === task.name && t.task === task.task
    );
    socket.emit("delete", index);
  };

  React.useEffect(() => {
    socket.on("task", task => {
      setTasks(prevState => [...prevState, task]);
    });
    socket.on("delete", index => {
      setTasks(prevState => prevState.filter((task, i) => i !== index));
    });
  }, [socket]);
  const handleChange = e => {
    console.log(e.target.name, e.target.value);
    setName(e.target.value);
  };
  const handleName = () => {
    setIsName(() => true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <input
          onChange={handleChange}
          placeholder="Task..."
          disabled={isName}
          value={name}
        />
        <button onClick={handleName} disabled={isName}>
          Set Name
        </button>
        <Form onSubmit={handleSubmit} isName={isName} />
        <DisplayTasks />
      </header>
    </div>
  );
}

export default App;
