import { StateSchema } from "@/app/providers/StoreProvider";
import { buildSelector } from "@/shared/lib/store";

export const [useProfileReadonly] = buildSelector(
  (state: StateSchema) => state.profile?.readonly
);
