import { StateSchema } from "@/app/providers/StoreProvider";
import { buildSelector } from "@/shared/lib/store";

export const [useLoginUserName] = buildSelector(
  (state: StateSchema) => state?.loginForm?.username || ""
);
