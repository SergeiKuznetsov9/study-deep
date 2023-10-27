export type BuildMode = "production" | "development";

export interface BuildPaths {
  entry: string;
  build: string;
  html: string;
}

export interface BuildOptions {
  mode: BuildMode;

  // тут будут различные пути (до входной точки, до папки куда делается сборка,
  // до HTML и т.д.)
  // Это будет выглядить так: мы будем принимать их из вне. И там, откуда они будут
  // поступать, мы будем их конфигурировать по условию
  paths: BuildPaths;
  isDev: boolean;
}
