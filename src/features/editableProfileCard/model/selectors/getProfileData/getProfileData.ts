import { StateSchema } from "@/app/providers/StoreProvider";
import { buildSelector } from "@/shared/lib/store";

export const [useProfileData] = buildSelector(
  (state: StateSchema) => state.profile?.data
);
