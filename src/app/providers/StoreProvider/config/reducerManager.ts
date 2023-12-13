import {
  AnyAction,
  Reducer,
  ReducersMapObject,
  combineReducers,
} from "@reduxjs/toolkit";
import { ReducerManager, StateSchema, StateSchemaKey } from "./StateSchema";

export function createReducerManager(
  initialReducers: ReducersMapObject<StateSchema>
): ReducerManager {
  const reducers = { ...initialReducers };

  //   знакомая функция при помощзи которой создается корневой редьюсер
  let combinedReducer = combineReducers(reducers);

  // этот массив хранит названия редьюсеров, которые мы хотим удалить
  // типизируем его
  let keysToRemove: StateSchemaKey[] = [];

  return {
    //   эта функция просто возвращает редьюсеры
    getReducerMap: () => reducers,

    // А вот это по своей сути и есть редьюсер. Но он из стэйта удаляет все что есть
    // в массиве ключей
    reduce: (state: StateSchema, action: AnyAction) => {
      if (keysToRemove.length > 0) {
        state = { ...state };
        for (let key of keysToRemove) {
          delete state[key];
        }
        keysToRemove = [];
      }

      // Затем возвращаем новый редьюсер без лишних ключей
      return combinedReducer(state, action);
    },

    // Эта функция по ключу добавляет в стейт новый редьюсер
    add: (key: StateSchemaKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return;
      }

      reducers[key] = reducer;

      combinedReducer = combineReducers(reducers);
    },

    // Добавляет в массив ключ и удаляет его из редьюсера
    remove: (key: StateSchemaKey) => {
      if (!key || !reducers[key]) {
        return;
      }

      delete reducers[key];

      keysToRemove.push(key);

      combinedReducer = combineReducers(reducers);
    },
  };
}
