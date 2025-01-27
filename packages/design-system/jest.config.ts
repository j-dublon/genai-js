export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleDirectories: ["node_modules", "lib"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-transformer-svg",
    "^@components/(.*)$": "<rootDir>/lib/components/$1",
    "^@icons/(.*)$": "<rootDir>/lib/icons/$1",
    "^@utils/(.*)$": "<rootDir>/lib/utils/$1",
    "^@hooks/(.*)$": "<rootDir>/lib/hooks/$1",
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
