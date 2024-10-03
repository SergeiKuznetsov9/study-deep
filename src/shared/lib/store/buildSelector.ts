import { StateSchema } from "@/app/providers/StoreProvider";
import { useAppSelector } from "../hooks/useAppSelector/useAppSelector";

type Selector<T> = (state: StateSchema) => T;
type Result<T> = [() => T, Selector<T>];

export const buildSelector = <T>(selector: Selector<T>): Result<T> => {
  const useSelectorHook = () => {
    return useAppSelector(selector);
  };

  return [useSelectorHook, selector];
};
