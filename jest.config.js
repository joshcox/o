module.exports = {
    "globals": {
        "ts-jest": {
            "tsConfig": "tsconfig.json"
        }
    },
    "moduleFileExtensions": ["js", "ts"],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    "testMatch": ["<rootDir>/test/**/*.ts"],
    "testPathIgnorePatterns": ["/node_modules/", "/fixtures/"],
    "watchPathIgnorePatterns": ["/fixtures/"],
    "testEnvironment": "node",
    "verbose": true
};
