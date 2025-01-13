module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "settings": {
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.json",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "no-unused-vars": "off",
        "no-useless-escape": "warn",
        "no-irregular-whitespace": "warn",
        "no-self-assign": "warn",
        "no-prototype-builtins": "off",
        "no-control-regex": "off",
        "no-constant-condition": "warn",
        "no-case-declarations": "off",
        "camelcase": "off"
    }
};
