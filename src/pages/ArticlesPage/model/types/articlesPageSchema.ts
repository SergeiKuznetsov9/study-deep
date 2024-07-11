import { EntityState } from "@reduxjs/toolkit";
import { Article, ArticleView } from "entities/Article";

export interface ArticlesPageSchema extends EntityState<Article> {
  isLoading?: boolean;
  error?: string;

  view: ArticleView;
  // for pagination
  page: number;
  hasMore: boolean;
  _inited: boolean;
  limit?: number;
}
