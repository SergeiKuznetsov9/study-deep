import { lazy, Suspense } from "react";

import { Skeleton } from "@/shared/ui/Skeleton";
import { ArticleRatingProps } from "./ArticleRating";

const ArticleRating = lazy(() => import("./ArticleRating"));

export const ArticleRatingAsync = (props: ArticleRatingProps) => (
  <Suspense fallback={<Skeleton width="100%" height={140} />}>
    <ArticleRating {...props} />
  </Suspense>
);
