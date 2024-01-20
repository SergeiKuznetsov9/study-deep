import { Reducer } from "@reduxjs/toolkit";
import {
  ReduxStoreWithManager,
  useAppDispatch,
} from "app/providers/StoreProvider";
import { StateSchemaKey } from "app/providers/StoreProvider/config/StateSchema";
import { FC, ReactNode, useEffect } from "react";
import { useStore } from "react-redux";

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer;
};

export type ReducersListEntry = [StateSchemaKey, Reducer];

interface DynamicModuleLoaderProps {
  reducers: ReducersList;
  children: ReactNode;
  removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = ({
  reducers,
  children,
  removeAfterUnmount,
}) => {
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useAppDispatch();

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => {
      store.reducerManager.add(name, reducer);
      dispatch({ type: `@INIT ${name} reducer` });
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(
          ([name, reducer]: ReducersListEntry) => {
            store.reducerManager.remove(name);
            dispatch({ type: `@INIT ${name} reducer` });
          }
        );

        dispatch({ type: `@DESTROY ${name} reducer` });
      }
    };
  }, []);

  return <>{children}</>;
};
