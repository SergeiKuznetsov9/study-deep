import { Reducer } from "@reduxjs/toolkit";
import {
  ReduxStoreWithManager,
  useAppDispatch,
} from "app/providers/StoreProvider";
import { StateSchemaKey } from "app/providers/StoreProvider/config/StateSchema";
import { FC, ReactNode, useEffect } from "react";
import { useStore } from "react-redux";

interface DynamicModuleLoaderProps {
  name: StateSchemaKey;
  reducer: Reducer;
  children: ReactNode;
  removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = ({
  name,
  reducer,
  children,
  removeAfterUnmount,
}) => {
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useAppDispatch();

  // необходимо отметить, ыто при такой реализации, редьюсер будет инициализироваться
  // всякий раз при запуске кода. Это не критично, если он всегда будет удаляться

  useEffect(() => {
    store.reducerManager.add(name, reducer);
    dispatch({ type: `@INIT ${name} reducer` });

    return () => {
      if (removeAfterUnmount) {
        store.reducerManager.remove(name);
        dispatch({ type: `@DESTROY ${name} reducer` });
      }
    };
  }, []);

  return <>{children}</>;
};
