import { StateSchema } from "@/app/providers/StoreProvider";
import { buildSelector } from "@/shared/lib/store";

export const [useProfileValidateErrors] = buildSelector(
  (state: StateSchema) => state.profile?.validateError
);
