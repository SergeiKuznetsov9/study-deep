// Адрес страницы, позиция скролла
// Планируется сохраниять по ключу страницы позицию скролла в момент его прокрутки
export type ScrollSchema = Record<string, number>;

export type PageSchema = {
  scroll: ScrollSchema;
};
