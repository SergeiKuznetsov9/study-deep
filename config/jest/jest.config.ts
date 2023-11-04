import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  testEnvironment: "jest-environment-jsdom",
  coveragePathIgnorePatterns: ["\\\\node_modules\\\\", "\\\\build\\\\"],
  moduleDirectories: ["node_modules"],
  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node",
  ],
  rootDir: "../../",
  testMatch: ["<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};

export default config;
