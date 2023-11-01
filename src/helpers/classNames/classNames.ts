type Mods = Record<string, boolean | string>;

export const classNames = (
  cls: string,
  mods: Mods,
  additional: string[]
): string => {
  return [
    cls,
    Object.entries(mods)
      .filter((style) => style[1])
      .map((style) => style[0]),
    ...additional,
  ].join(" ");
};
