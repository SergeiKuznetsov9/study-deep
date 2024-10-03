import { StateSchema } from "@/app/providers/StoreProvider";
import { buildSelector } from "@/shared/lib/store";

export const [useUserInited] = buildSelector(
  (state: StateSchema) => state.user._inited
);
