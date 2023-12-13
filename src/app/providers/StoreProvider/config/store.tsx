import { ReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { counterReducer } from "entities/Counter";
import { userReducer } from "entities/User";
import { StateSchema } from "./StateSchema";
import { createReducerManager } from "./reducerManager";

export type ApplicationDispatch = ReturnType<
  typeof createReduxStore
>["dispatch"];
export const useAppDispatch = () => useDispatch<ApplicationDispatch>();
export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    counter: counterReducer,
    user: userReducer,

    // Теперь его можно удалить отсюда, он будет прилетать асинхронно
    // loginForm: loginReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  // перед вовзращением стора получим его в отдельную переменную
  const store = configureStore<StateSchema>({
    // так работать не будет:
    // reducer: rootReducers,

    // нужно вот так:
    // иначе новые редьюсеры добавляться не будут
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  });

  // Теперь добавляем к стору свойство reducerManager:
  // При этом сразу заругается TS и в начале мы пометим это игнором
  // в последующем пофиксим
  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}
