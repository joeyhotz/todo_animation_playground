import React from "react";
import { useSpring, animated, config } from "react-spring";
import { TodoTick } from "./TodoTick";

export function TodoText({ index, todo, toggleState }) {
  const fadeIn = {
    opacity: 1,
    from: { opacity: 0 }
  };

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
