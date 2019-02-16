import React, { useState } from "react";
import "./App.css";
import { tododata } from "./tododata";
import { useSpring, animated } from "react-spring";

function Todo({ todo, index, toggleState, removeTodo }) {
  const squeezeInProps = useSpring({
    height: 20,
    from: { height: 0 }
  });

  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 }
  });

  return (
    <animated.div style={squeezeInProps} className="todo">
      <animated.span
        onClick={() => {
          toggleState(index);
        }}
        style={{ ...fadeInProps, width: "100%" }}
      >
        {todo.isCompleted ? "✓ " : ""} {todo.text}
      </animated.span>
      <button
        style={{ float: "right", zIndex: "100" }}
        onClick={() => {
          removeTodo(index);
        }}
      >
        x
      </button>
    </animated.div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  const [todos, setTodos] = useState(tododata);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const toggleState = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            toggleState={toggleState}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
