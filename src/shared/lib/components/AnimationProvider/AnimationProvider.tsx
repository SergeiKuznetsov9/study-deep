import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type SpringType = typeof import("@react-spring/web");

interface AnimationContextPayload {
  Spring?: SpringType;
  isLoaded?: boolean;
}

const AnimationContext = createContext<AnimationContextPayload>({});

const getAsyncAnimationModules = () => import("@react-spring/web");

export const useAnimationLibs = () => {
  return useContext(AnimationContext) as Required<AnimationContextPayload>;
};

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const SpringRef = useRef<SpringType>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getAsyncAnimationModules().then((Spring) => {
      setIsLoaded(true);
      SpringRef.current = Spring;
    });
  }, []);

  const value = useMemo(
    () => ({
      Spring: SpringRef.current,
      isLoaded,
    }),
    [isLoaded]
  );

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};
