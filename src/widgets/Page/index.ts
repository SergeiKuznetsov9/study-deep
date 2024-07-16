export { Page } from "./ui/Page";
export type { PageSchema } from "./model/types/pageSchema";
export { getPageScrollByPath } from "./model/selectors/pageSelectors";

export { pageReducer, pageActions } from "./model/slices/pageSlice";
