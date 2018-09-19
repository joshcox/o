module.exports = {
    "globals": {
        "ts-jest": {
            "tsConfigFile": "tsconfig.json"
        }
    },
    "moduleFileExtensions": ["js", "ts"],
    "transform": {
        "^.+\\.(ts|tsx)$": "./node_modules/ts-jest/preprocessor.js"
    },
    "testMatch": ["<rootDir>/test/**/*.ts"],
    "testPathIgnorePatterns": ["/node_modules/", "/fixtures/"],
    "watchPathIgnorePatterns": ["/fixtures/"],
    "testEnvironment": "node",
    "verbose": true
};
