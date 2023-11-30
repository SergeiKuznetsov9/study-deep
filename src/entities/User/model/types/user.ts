export interface User {
  id: string;
  username: string;
}

// Если пустая - значит пользователь не авторизован
// иначе - авторизован
export interface UserSchema {
  authData?: User;
}
