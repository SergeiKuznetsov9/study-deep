import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "@/app/providers/StoreProvider";
import { UserRole } from "../const/const";
import { buildSelector } from "@/shared/lib/store";

export const [useUserRoles, getUserRoles] = buildSelector(
  (state: StateSchema) => {
    return state.user.authData?.roles;
  }
);

export const [useIsUserAdmin] = buildSelector(
  createSelector(getUserRoles, (roles) =>
    Boolean(roles?.includes(UserRole.ADMIN))
  )
);
export const [useIsUserManager] = buildSelector(
  createSelector(getUserRoles, (roles) =>
    Boolean(roles?.includes(UserRole.MANAGER))
  )
);
