// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {

  clearMocks: true,

  moduleDirectories: [
    "node_modules"
  ],

  moduleFileExtensions: [
    "js",
    "json",
    "jsx",
    "ts",
    "tsx",
  ],

  roots: [
    "<rootDir>/test"
  ],

  testEnvironment: "node",

  testMatch: [
    // "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],

  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
};
