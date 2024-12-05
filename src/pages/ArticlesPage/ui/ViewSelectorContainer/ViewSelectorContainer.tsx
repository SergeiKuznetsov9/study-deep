import { FC } from "react";
import { ArticleViewSelector } from "@/features/articleViewSelector";
import { useArticleFilters } from "../../lib/hooks/useArticleFilters";

interface ViewSelectorContainerProps {
  className?: string;
}

export const ViewSelectorContainer: FC<ViewSelectorContainerProps> = ({
  className,
}) => {
  const { view, onChangeView } = useArticleFilters();

  return (
    <ArticleViewSelector
      className={className}
      view={view}
      onViewClick={onChangeView}
    />
  );
};
