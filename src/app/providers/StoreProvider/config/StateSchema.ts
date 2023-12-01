import { CounterSchema } from "entities/Counter";
import { UserSchema } from "entities/User";
import { LoginSchema } from "features/authByUserName";

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
  // Это пригодится попозже, поскольку этот редьюсер будет асинхронным и подгружать
  // мы его будем как асинхронные компоненты
  loginForm?: LoginSchema;
}
