import { StateSchema } from "@/app/providers/StoreProvider";
import { buildSelector } from "@/shared/lib/store";

export const [useLoginPassword] = buildSelector(
  (state: StateSchema) => state?.loginForm?.password || ""
);
