import React, { useState } from "react";
import "./App.css";
import { tododata } from "./tododata";
import { useSpring, animated, config } from "react-spring";

const slideOpen = {
  height: 20,
  from: { height: 0 }
};

const fadeIn = {
  opacity: 1,
  from: { opacity: 0 }
};

function Todo({ todo, index, toggleState, removeTodo }) {
  const slideOpenProps = useSpring({ ...slideOpen, config: config.gentle });

  return (
    <animated.div style={slideOpenProps} className="todo">
      <TodoText index={index} todo={todo} toggleState={toggleState} />
      <TodoRemoveButton index={index} removeTodo={removeTodo} />
    </animated.div>
  );
}

function TodoText({ index, todo, toggleState }) {
  const fadeInProps = useSpring({ ...fadeIn, config: config.gentle });

  return (
    <animated.span
      className="todo-text"
      onClick={() => {
        toggleState(index);
      }}
      style={{ ...fadeInProps, width: "100%" }}
    >
      <TodoTick isCompleted={todo.isCompleted} />
      {todo.text}
    </animated.span>
  );
}

function TodoTick({ isCompleted }) {
  const slideClosedProps = useSpring({
    to: { width: isCompleted ? 14 : 0, opacity: isCompleted ? 1 : 0 },
    config: config.gentle
  });

  return (
    <animated.div
      style={{
        ...slideClosedProps,
        display: "inline-block"
      }}
    >
      ✓
    </animated.div>
  );
}

function TodoRemoveButton({ index, removeTodo }) {
  const slideOpenProps = useSpring(fadeIn);

  return (
    <animated.button
      className="todo-remove-button"
      style={{ ...slideOpenProps, float: "right", zIndex: "100" }}
      onClick={() => {
        removeTodo(index);
      }}
    >
      x
    </animated.button>
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
