import { Reducer } from "@reduxjs/toolkit";
import { ReduxStoreWithManager } from "app/providers/StoreProvider";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { StateSchemaKey } from "app/providers/StoreProvider/config/StateSchema";
import { FC, ReactNode, useEffect } from "react";
import { useStore } from "react-redux";

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer;
};

interface DynamicModuleLoaderProps {
  reducers: ReducersList;
  children: ReactNode;
  removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = ({
  reducers,
  children,
  removeAfterUnmount = true,
}) => {
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useAppDispatch();

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]) => {
      store.reducerManager.add(name as StateSchemaKey, reducer);
      dispatch({ type: `@INIT ${name} reducer` });
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name, reducer]) => {
          store.reducerManager.remove(name as StateSchemaKey);
          dispatch({ type: `@INIT ${name} reducer` });
        });

        dispatch({ type: `@DESTROY ${name} reducer` });
      }
    };
  }, []);

  return <>{children}</>;
};
