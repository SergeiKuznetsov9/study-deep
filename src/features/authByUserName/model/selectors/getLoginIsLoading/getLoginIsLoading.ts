import { StateSchema } from "@/app/providers/StoreProvider";
import { buildSelector } from "@/shared/lib/store";

export const [useLoginIsLoading] = buildSelector(
  (state: StateSchema) => state?.loginForm?.isLoading || false
);
