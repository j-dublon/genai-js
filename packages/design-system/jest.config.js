export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-transformer-svg",
    "^@components/(.*)$": "<rootDir>/lib/components/$1",
    "^@icons/(.*)$": "<rootDir>/lib/icons/$1",
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
