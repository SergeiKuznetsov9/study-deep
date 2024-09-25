import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "@/app/providers/StoreProvider";
import { UserRole } from "../const/const";

export const getUserRoles = (state: StateSchema) => {
  return state.user.authData?.roles;
};

export const isUserAdmin = createSelector(getUserRoles, (roles) =>
  Boolean(roles?.includes(UserRole.ADMIN))
);
export const isUserManager = createSelector(getUserRoles, (roles) =>
  Boolean(roles?.includes(UserRole.MANAGER))
);
