import {
  CombinedState,
  Reducer,
  ReducersMapObject,
  configureStore,
  ThunkDispatch,
  AnyAction,
} from "@reduxjs/toolkit";
import { counterReducer } from "entities/Counter";
import { userReducer } from "entities/User";
import { StateSchema, ThunkExtraArg } from "./StateSchema";
import { createReducerManager } from "./reducerManager";
import { $api } from "shared/api/api";
import { pageReducer } from "widgets/Page";
import { rtkApi } from "shared/api/rtkApi";

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
    page: pageReducer,
    // созданный объект rtkApi нужно также добавить в редьюсер
    [rtkApi.reducerPath]: rtkApi.reducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const extraArg: ThunkExtraArg = {
    api: $api,
  };

  const store = configureStore<StateSchema>({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    preloadedState: initialState,
    // @ts-expect-error: ошибки нет
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
        // также нужно добавить мидлвару, обрабатывающую экшн
      }).concat(rtkApi.middleware),
  });
  // @ts-expect-error: ошибки нет
  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatch = ThunkDispatch<StateSchema, ThunkExtraArg, AnyAction>;
