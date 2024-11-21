import { StateSchema } from "@/app/providers/StoreProvider";
import { buildSelector } from "@/shared/lib/store";

export const [useAddCommentFormText] = buildSelector(
  (state: StateSchema) => state.addCommentForm?.text ?? ""
);
