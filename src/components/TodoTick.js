import React from "react";
import { useSpring, animated, config } from "react-spring";

export function TodoTick({ isCompleted }) {
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
