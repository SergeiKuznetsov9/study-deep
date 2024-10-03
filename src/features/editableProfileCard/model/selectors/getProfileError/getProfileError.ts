import { StateSchema } from "@/app/providers/StoreProvider";
import { buildSelector } from "@/shared/lib/store";

export const [useProfileError] = buildSelector(
  (state: StateSchema) => state.profile?.error
);
