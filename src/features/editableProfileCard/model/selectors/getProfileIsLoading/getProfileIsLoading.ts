import { StateSchema } from "@/app/providers/StoreProvider";
import { buildSelector } from "@/shared/lib/store";

export const [useProfileIsLoading] = buildSelector(
  (state: StateSchema) => state.profile?.isLoading
);
