import { FC, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import CopyIcon from "@/shared/assets/icons/copy.svg";
import { Icon } from "../Icon/Icon";
import cls from "./Code.module.scss";

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
      <Icon clickable className={cls.copyBtn} Svg={CopyIcon} onClick={onCopy} />
      <code>{text}</code>
    </pre>
  );
};
