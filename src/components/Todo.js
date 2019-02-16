import React from "react";
import { useSpring, animated, config } from "react-spring";
import { TodoRemoveButton } from "./TodoRemoveButton";
import { TodoText } from "./TodoText";

export function Todo({ todo, index, toggleState, removeTodo }) {
  const slideOpen = {
    height: 20,
    from: { height: 0 }
  };

  const slideOpenProps = useSpring({ ...slideOpen, config: config.gentle });

  return (
    <animated.div style={slideOpenProps} className="todo">
      <TodoText index={index} todo={todo} toggleState={toggleState} />
      <TodoRemoveButton index={index} removeTodo={removeTodo} />
    </animated.div>
  );
}
