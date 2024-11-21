import { StateSchema } from "@/app/providers/StoreProvider";
import { buildSelector } from "@/shared/lib/store";

export const [useArticleCommentsIsLoading] = buildSelector(
  (state: StateSchema) => state.articleDetailsPage?.comments.isLoading
);
