import { FC } from "react";

import cls from "./Example.module.scss";
import { animated, useSpring } from "@react-spring/web";

interface ExampleProps {
  className?: string;
}

export const Example: FC<ExampleProps> = () => {
  const [springs, api] = useSpring(() => ({
    from: { x: 0 },
  }));

  const handleClick = () => {
    api.start({
      from: {
        x:0
      },
      to: {
        x: 100
      }
    })
  }

  return (
    <>
    {/* <div className={cls.ex}></div> */}
    <animated.div
      onClick={handleClick}
      className={cls.ex}
      style={{
        ...springs,
      }}
    />
    </>
  );
};
