import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import cls from "./LoginForm.module.scss";
import { loginActions } from "../../model/slice/loginSlice";
import { getLoginState } from "../../model/selectors/selectLoginState/getLoginState";
import { loginByUserName } from "../../model/services/loginByUserName/loginByUserName";
import { useAppDispatch, useAppSelector } from "app/providers/StoreProvider";

interface LoginFormProps {
  className?: string;
}

// для избежания лишних перерисовок обернм в memo
export const LoginForm: FC<LoginFormProps> = memo(({ className }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { username, password, error, isLoading } =
    useAppSelector(getLoginState);

  // поскольку будем передавать эту функцию пропсом, то будем использовать
  // useCallback, чтобы ссылка не изменялась
  const onChangeUserName = useCallback(
    (value: string) => {
      dispatch(loginActions.setUserName(value));
    },
    [dispatch]
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch]
  );

  const onLoginClick = useCallback(() => {
    dispatch(loginByUserName({ username, password }));
  }, [dispatch, username, password]);

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      {error && <div>{error}</div>}
      <Input
        type="text"
        className={cls.input}
        placeholder={t("Введите Имя")}
        autoFocus={true}
        onChange={onChangeUserName}
        value={username}
      />
      <Input
        type="text"
        className={cls.input}
        placeholder={t("Введите Пароль")}
        onChange={onChangePassword}
        value={password}
      />
      <Button
        className={cls.loginBtn}
        theme={ButtonTheme.OUTLINE}
        onClick={onLoginClick}
        disabled={isLoading}
      >
        {t("Войти")}
      </Button>
    </div>
  );
});
