/* eslint-disable no-undef */
module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true,
        'jest': true,
      },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'overrides': [
    ],
    'parser': '@babel/eslint-parser',
    'parserOptions': {
        'requireConfigFile': false,
        'ecmaVersion': 'latest',
        'sourceType': 'module',
        'babelOptions': {
            "presets": ["@babel/preset-react"]
        },
    },
    'plugins': [
        'react'
    ],
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'windows'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'eqeqeq': 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ],
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ],
        'no-console': 0,
        // suppress errors for missing 'import React' in files
        "react/react-in-jsx-scope": "off",
        // allow jsx syntax in js files (for next.js project)
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }], //should add ".ts" if typescript project
        "react/prop-types": 0
    }
}
