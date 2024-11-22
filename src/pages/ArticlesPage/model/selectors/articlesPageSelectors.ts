import { StateSchema } from "@/app/providers/StoreProvider";
import { ArticleType, ArticleView } from "@/entities/Article";
import { ArticleSortField } from "@/entities/Article";
import { buildSelector } from "@/shared/lib/store";

export const [useArticlesPageIsLoading, getArticlesPageIsLoading] =
  buildSelector((state: StateSchema) => state.articlesPage?.isLoading || false);

export const [useArticlesPageError] = buildSelector(
  (state: StateSchema) => state.articlesPage?.error
);
export const [useArticlesPageView] = buildSelector(
  (state: StateSchema) => state.articlesPage?.view || ArticleView.SMALL
);
export const [useArticlesPageNum, getArticlesPageNum] = buildSelector(
  (state: StateSchema) => state.articlesPage?.page || 1
);

export const [useArticlesPageLimit, getArticlesPageLimit] = buildSelector(
  (state: StateSchema) => state.articlesPage?.limit || 9
);

export const [useArticlesPageHasMore, getArticlesPageHasMore] = buildSelector(
  (state: StateSchema) => state.articlesPage?.hasMore
);

export const [useArticlesPageInited, getArticlesPageInited] = buildSelector(
  (state: StateSchema) => state.articlesPage?._inited
);

export const [useArticlesPageOrder, getArticlesPageOrder] = buildSelector(
  (state: StateSchema) => state.articlesPage?.order ?? "asc"
);

export const [useArticlesPageSort, getArticlesPageSort] = buildSelector(
  (state: StateSchema) => state.articlesPage?.sort ?? ArticleSortField.CREATED
);

export const [useArticlesPageSearch, getArticlesPageSearch] = buildSelector(
  (state: StateSchema) => state.articlesPage?.search ?? ""
);

export const [useArticlesPageType, getArticlesPageType] = buildSelector(
  (state: StateSchema) => state.articlesPage?.type ?? ArticleType.All
);

export const [useArticleItemById] = buildSelector(
  (state, id: string) => state.articlesPage?.entities[id]
);
