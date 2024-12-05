import { FC } from "react";
import { ArticleFilters } from "@/widgets/ArticleFilters";
import { useArticleFilters } from "../../lib/hooks/useArticleFilters";

interface FiltersContainerProps {
  className?: string;
}

export const FiltersContainer: FC<FiltersContainerProps> = ({ className }) => {
  const {
    sort,
    order,
    search,
    type,
    onChangeSort,
    onChangeType,
    onChangeOrder,
    onChangeSearch,
  } = useArticleFilters();

  return (
    <ArticleFilters
      className={className}
      sort={sort}
      order={order}
      search={search}
      type={type}
      onChangeSort={onChangeSort}
      onChangeType={onChangeType}
      onChangeOrder={onChangeOrder}
      onChangeSearch={onChangeSearch}
    />
  );
};
