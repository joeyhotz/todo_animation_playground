import React from "react";
import { useSpring, animated } from "react-spring";

export function TodoRemoveButton({ index, removeTodo }) {
  const fadeIn = {
    opacity: 1,
    from: { opacity: 0 }
  };

  const fadeInProps = useSpring(fadeIn);

  return (
    <animated.button
      className="todo-remove-button"
      style={{ ...fadeInProps, float: "right", zIndex: "100" }}
      onClick={() => {
        removeTodo(index);
      }}
    >
      x
    </animated.button>
  );
}
