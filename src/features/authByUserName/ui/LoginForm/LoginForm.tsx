import { FC, memo, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { classNames } from "@/shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Text, TextTheme } from "@/shared/ui/Text";

import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

import { loginActions, loginReducer } from "../../model/slice/loginSlice";
import { loginByUserName } from "../../model/services/loginByUserName/loginByUserName";
import { useLoginUserName } from "../../model/selectors/getLoginUserName/getLoginUserName";
import { useLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { useLoginError } from "../../model/selectors/getLoginError/getLoginError";
import { useLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import cls from "./LoginForm.module.scss";

interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

const LoginForm: FC<LoginFormProps> = memo(({ className, onSuccess }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const username = useLoginUserName();
  const password = useLoginPassword();
  const error = useLoginError();
  const isLoading = useLoginIsLoading();

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

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUserName({ username, password }));
    if (result.meta.requestStatus === "fulfilled") {
      onSuccess();
    }
  }, [dispatch, onSuccess, username, password]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        onLoginClick();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dispatch, onSuccess, username, password]);

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true}>
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
    </DynamicModuleLoader>
  );
});

export default LoginForm;
