import { FC, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Code.module.scss";
import { Button, ButtonTheme } from "../Button/Button";
import { Icon } from "../Icon/Icon";
import CopyIcon from "@/shared/assets/icons/copy.svg";

interface CodeProps {
  text: string;
  className?: string;
}

export const Code: FC<CodeProps> = ({ text, className }) => {
  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <pre className={classNames(cls.Code, {}, [className])}>
      <Button
        className={cls.copyBtn}
        theme={ButtonTheme.CLEAR}
        onClick={onCopy}
      >
        <Icon Svg={CopyIcon} className={cls.icon} />
      </Button>
      <code>{text}</code>
    </pre>
  );
};
