import {
  FC,
  InputHTMLAttributes,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Input.module.scss";

// Такая конструкция приводит к ошибке TypeScript, поскольку onChange
// уже имеется в типе InputHTMLAttributes.
// Для того чтобы пофиксить это, можно воспользоваться типом Omit.
// Он позволяет забрать из типа все пропсы,но исключить те, которые нам не нужны

// interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
//   className?: string;
//   value?: string;
//   onChange?: (value: string) => void;
// }

// Первый агрумент Omit - то что мы хотим забрать,
// Второй - то что мы хотим исключить,
interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
  placeholder?: string;
  autoFocus?: boolean;
}

export const Input: FC<InputProps> = memo(
  ({
    className,
    value,
    onChange,
    type = "text",
    placeholder,
    autoFocus,
    ...otherProps
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [caretPosition, setCaretPosition] = useState(0);
    const ref = useRef<HTMLInputElement>();

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
      // устанавливаем длину строки, которую мы ввели
      setCaretPosition(e.target.value.length);
      console.log(e.target.value.length);
    };

    const onBlur = () => {
      setIsFocused(false);
    };

    const onFocus = () => {
      setIsFocused(true);
    };

    const onSelect = (e: any) => {
      setCaretPosition(e?.target?.selectionStart || 0);
    };

    // Устанавливаем автофокус
    useEffect(() => {
      if (autoFocus) {
        setIsFocused(true);

        // В обычной реализации, фокус не появится. Т.к. модалка рендерится сразу
        // И фокус устанавливается сразу. Но после того, как мы вызвали модалку,
        // фокус перемещается на кнопку, на которую мы нажали. Поэтому нужно сделать
        // возможность ленивой подгрузки модалки

        // Это также нужно, если в модалку будет закидываться асинхронный компонент
        ref.current?.focus();
      }
    }, [autoFocus]);

    return (
      <div className={classNames(cls.InputWrapper, {}, [className])}>
        {placeholder && (
          <div className={cls.placeholder}>{`${placeholder}>`}</div>
        )}

        <div className={cls.caretWrapper}>
          <input
            ref={ref}
            type={type}
            value={value}
            onChange={onChangeHandler}
            className={cls.input}
            onFocus={onFocus}
            onBlur={onBlur}
            // При помощи этого события можно отслеживать какая часть
            // текста выделена, где находится коретка и т.д.
            onSelect={onSelect}
            {...otherProps}
          />
          {/* каретка */}
          {isFocused && (
            <span
              style={{ left: `${caretPosition * 18}px` }}
              className={cls.caret}
            ></span>
          )}
        </div>
      </div>
    );
  }
);
