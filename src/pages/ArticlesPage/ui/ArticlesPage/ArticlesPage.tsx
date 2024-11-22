import { FC, memo, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Page } from "@/widgets/Page";
import { classNames } from "@/shared/lib/classNames/classNames";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";

import { fetchNextArticlesPage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import { initArticlesPage } from "../../model/services/initArticlesPage/initArticlesPage";
import { ArticlesPageFilters } from "../ArticlesPageFilters/ArticlesPageFilters";
import { ArticlesInfinitList } from "../ArticlesInfinitList/ArticlesInfinitList";
import { articlesPageReducer } from "../../model/slices/articlesPageSlice";
import {
  useArticleItemById,
  useArticlesPageHasMore,
  useArticlesPageIsLoading,
} from "../../model/selectors/articlesPageSelectors";

import cls from "./ArticlesPage.module.scss";

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const dispatch = useAppDispatch();
  const isLoading = useArticlesPageIsLoading();
  const isHasMoreArticles = useArticlesPageHasMore();

  const [searchParams] = useSearchParams();
  
  const articleItem = useArticleItemById('670e4a0655e53c8e6099fcfe')
  console.log(articleItem)

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initArticlesPage(searchParams));
  }, [dispatch]);

  useEffect(() => {
    if (isHasMoreArticles && isIntersecting && !isLoading) {
      dispatch(fetchNextArticlesPage());
    }
  }, [dispatch, isHasMoreArticles, isIntersecting, isLoading]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        className={classNames(cls.ArticlesPage, {}, [className])}
        onScrollEnd={onLoadNextPart}
        setIsIntersecting={setIsIntersecting}
      >
        <ArticlesPageFilters />
        <ArticlesInfinitList className={cls.list} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
