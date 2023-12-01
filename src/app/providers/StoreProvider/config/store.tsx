import { ReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { counterReducer } from "entities/Counter";
import { userReducer } from "entities/User";
import { StateSchema } from "./StateSchema";
import { loginReducer } from "features/authByUserName";

// В курсе не было. Добавлено самостоятельно для решения проблем типизации
export type ApplicationDispatch = ReturnType<
  typeof createReduxStore
>["dispatch"];
export const useAppDispatch = () => useDispatch<ApplicationDispatch>();
export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    counter: counterReducer,
    user: userReducer,
    loginForm: loginReducer,
  };

  return configureStore<StateSchema>({
    reducer: rootReducers,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  });
}
