import { FC } from "react";
import { ArticleDetails } from "@/entities/Article";
import { Card } from "@/shared/ui/Card";

interface DetailsContainerProps {
  id: string;
  className?: string;
}

export const DetailsContainer: FC<DetailsContainerProps> = ({
  className,
  id,
}) => {
  return (
    <Card max border="round" className={className} padding="24">
      <ArticleDetails id={id} />
    </Card>
  );
};
