import { UserRole } from "../const/const";

export interface User {
  _id: string;
  username: string;
  avatar?: string;
  roles?: UserRole[];
}

export interface UserSchema {
  authData?: User;
  _inited: boolean;
}
