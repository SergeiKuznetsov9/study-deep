import { FC, memo, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { loginActions, loginReducer } from "../../model/slice/loginSlice";
import { loginByUserName } from "../../model/services/loginByUserName/loginByUserName";
import {
  ReduxStoreWithManager,
  useAppDispatch,
  useAppSelector,
} from "app/providers/StoreProvider";
import { Text, TextTheme } from "shared/ui/Text/Text";
import cls from "./LoginForm.module.scss";
import { useStore } from "react-redux";
import { getLoginUserName } from "../../model/selectors/getLoginUserName/getLoginUserName";
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { getLoginError } from "../../model/selectors/getLoginError/getLoginError";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";

interface LoginFormProps {
  className?: string;
}

const LoginForm: FC<LoginFormProps> = memo(({ className }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const store = useStore() as ReduxStoreWithManager;
  const username = useAppSelector(getLoginUserName);
  const password = useAppSelector(getLoginPassword);
  const error = useAppSelector(getLoginError);
  const isLoading = useAppSelector(getLoginIsLoading);

  useEffect(() => {
    store.reducerManager.add("loginForm", loginReducer);

    return () => {
      store.reducerManager.remove("loginForm");
    };
  }, []);

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
      <Text title={t("Форма авторизации")} />
      {error && (
        <Text
          text={t("Вы ввели неверный логин или пароль")}
          theme={TextTheme.ERROR}
        />
      )}
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

export default LoginForm;
