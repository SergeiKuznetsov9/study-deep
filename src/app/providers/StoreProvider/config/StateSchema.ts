import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import { CounterSchema } from "entities/Counter";
import { UserSchema } from "entities/User";
import { LoginSchema } from "features/authByUserName";

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;

  // Асинхронные редьюсеры
  loginForm?: LoginSchema;
}

// для создания типа, соответсвующего ключам объекта воспользуемся следующим приемом:
export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

// создадим тип для стора с менеджером
// EnhancedStore - это стандартный тип, который возвращается при создании стора
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}
