import { FC, memo, useCallback, useEffect } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticlesPage.module.scss";
import {
  ArticleList,
  ArticleView,
  ArticleViewSelector,
} from "entities/Article";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
  articlesPageActions,
  articlesPageReducer,
  getArticles,
} from "../../model/slices/articlesPageSlice";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import {
  getArticlesPageIsLoading,
  getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors";
import { Page } from "widgets/Page";
import { fetchNextArticlesPage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import { initArticlesPage } from "pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage";

interface ArticlesPageProps {
  className?: string;
}

// Получаем редьюсер, имеющий логику работы с данными, необходимыми для работы этой страницы
// Он нам нужен для того, чтобы прокинуть его в лоудер редьюсеров и соответственно создать его
const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
  const dispatch = useAppDispatch();

  // Получаем статьи, которые затем прокидываем в компонент из другого слоя для отображения
  // Логика загрузки статей также относится к этому модулю

  // useSelector по своей сути вызывает прокинутую в него функцию, предавая в нее аргументом
  // стэйт. Это можно сделать и самостоятельно, если есть доступ к стейту, но нет возможности
  // вызвать хук
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const view = useSelector(getArticlesPageView);

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view));
    },
    [dispatch]
  );

  const onLoadNextPart = useCallback(() => {
    // диспатчим загрузку следующих порций статей

    // ПРО ДИСПАТЧ
    // dispatch по своей сути вызывает выполнение некоторой функции. В нее можно передать что-нибудь
    // посредствам передачи аргумента в экшн. Варианты его вызова следующие:
    
    // Осуществляется вызов функции редьюсера: функция подбирается по названию переданного в dispatch
    // экшена. Такой экшн создается автоматически и самостоятельно (в RTK естественно). Это самый
    // простой вариант.
    
    // Второй вариант - вызов асинхронной санки. Более подробно - в fetchNextArticlesPage() 
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useEffect(() => {
    // Готовим все необходимое для показа страницы
    dispatch(initArticlesPage());
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        className={classNames(cls.ArticlesPage, {}, [className])}
        onScrollEnd={onLoadNextPart}
      >
        {/* Отдельные сущности из другого слоя */}
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
        <ArticleList view={view} articles={articles} isLoading={isLoading} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
