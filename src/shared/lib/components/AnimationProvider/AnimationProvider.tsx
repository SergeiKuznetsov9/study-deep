// Здесь будут подгружаться библиотеки и отдаваться туда, куда необходимо

// Этот провайдер будет оборачивать только те компоненты, а которых будет использоваться
// библиотека React Spring

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// Получаем типы:
type SpringType = typeof import("@react-spring/web");

interface AnimationContextPayload {
  Spring?: SpringType;
  isLoaded?: boolean;
}

const AnimationContext = createContext<AnimationContextPayload>({});

// Вот функция, которая лениво подгружает библиотеку:
const getAsyncAnimationModules = () => import("@react-spring/web");

export const useAnimationLibs = () => {
  return useContext(AnimationContext) as Required<AnimationContextPayload>;
};

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  // Все подгружаемые библиотеки сложим в рефы. У нас одна библиотека. Было бы больше
  // библиотек, создали бы и больше рефов. Они нам нужны, чтобы хранить в них значения
  // между рендерами
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
