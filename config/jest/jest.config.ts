export default {
  clearMocks: true,
  testEnvironment: "jsdom",
  coveragePathIgnorePatterns: ["\\\\node_modules\\\\"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  moduleDirectories: ["node_modules"],
  modulePaths: ["<rootDir>src"],
  testMatch: ["<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)"],
  rootDir: "../../",
};
