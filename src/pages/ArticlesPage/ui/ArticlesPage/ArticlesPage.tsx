import { FC, memo, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Page } from "@/widgets/Page";
import { classNames } from "@/shared/lib/classNames/classNames";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { StickyContentLayout } from "@/shared/layouts/StickyContentLayout";

import { fetchNextArticlesPage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import { initArticlesPage } from "../../model/services/initArticlesPage/initArticlesPage";
import { ArticlesInfinitList } from "../ArticlesInfinitList/ArticlesInfinitList";
import { articlesPageReducer } from "../../model/slices/articlesPageSlice";
import {
  useArticlesPageHasMore,
  useArticlesPageIsLoading,
} from "../../model/selectors/articlesPageSelectors";
import { ViewSelectorContainer } from "../ViewSelectorContainer/ViewSelectorContainer";
import { FiltersContainer } from "../FiltersContainer/FiltersContainer";

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
      <StickyContentLayout
        left={<ViewSelectorContainer />}
        right={<FiltersContainer />}
        content={
          <Page
            className={classNames("", {}, [className])}
            onScrollEnd={onLoadNextPart}
            setIsIntersecting={setIsIntersecting}
          >
            {/* <ArticlesPageFilters /> */}
            <ArticlesInfinitList />
          </Page>
        }
      ></StickyContentLayout>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
