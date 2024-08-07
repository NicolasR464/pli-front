module.exports = {
    root: true,
    env: {
        browser: true,
        es2022: true,
        node: true,
    },
    extends: [
        'eslint:all',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:react/all',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/strict',
        'next/core-web-vitals',
        'plugin:@typescript-eslint/all',
        'plugin:unicorn/all',
        'plugin:prettier/recommended',
        'plugin:jest-dom/recommended',
    ],
    plugins: [
        '@typescript-eslint',
        'prefer-arrow-functions',
        'prettier',
        'simple-import-sort',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        project: true,
        sourceType: 'module',
        tsconfigRootDir: __dirname,
    },
    ignorePatterns: [
        '.eslintrc.js',
        'jest.config.mjs',
        'next-sitemap.config.js',
        'public/mockServiceWorker.js',
        'prettier.config.mjs',
        'postcss.config.mjs',
        'next.config.mjs',
        'next-env.d.ts',
        'jest.setup.js',
        'src/components/shadcnUI/**',
        'tailwind.config.ts',
    ],
    overrides: [
        {
            files: ['tests/**'],
            extends: [
                'plugin:jest/all',
                'plugin:jest-formatting/strict',
                'plugin:jest-dom/recommended',
                'plugin:testing-library/react',
            ],
        },
    ],
    rules: {
        camelcase: 'off',
        complexity: 'off',
        'consistent-return': 'off',
        'id-length': ['error', { exceptionPatterns: ['t'] }],
        'max-lines': 'off',
        'max-lines-per-function': 'off',
        'max-statements': 'off',
        'no-duplicate-imports': 'off',
        'no-implicit-coercion': [
            'error',
            {
                allow: ['!!'],
                disallowTemplateShorthand: true,
            },
        ],
        'no-plusplus': 'off',
        'no-ternary': 'off',
        'no-undefined': 'off',
        'one-var': 'off',
        'sort-keys': 'off',
        'sort-imports': 'off',
        'unicorn/string-content': 'off',
        'react/jsx-no-leaked-render': [
            'error',
            { validStrategies: ['coerce'] },
        ],

        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/max-params': ['error', { maximum: 10 }],
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-magic-numbers': 'off',
        '@typescript-eslint/prefer-readonly-parameter-types': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        'import/first': 'error',
        'import/namespace': ['error', { allowComputed: true }],
        'import/newline-after-import': [
            'error',
            { considerComments: true, exactCount: true },
        ],
        'import/no-duplicates': 'error',
        'prefer-arrow-functions/prefer-arrow-functions': 'error',
        'react/button-has-type': 'off',
        'react/forbid-component-props': 'off',
        'react/jsx-curly-brace-presence': [
            'error',
            {
                children: 'always',
                propElementValues: 'always',
                props: 'never',
            },
        ],
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
        'react/function-component-definition': [
            'error',
            {
                namedComponents: 'arrow-function',
                unnamedComponents: 'arrow-function',
            },
        ],
        'react/jsx-no-bind': ['error', { allowArrowFunctions: true }],
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-sort-props': 'off',
        'react/no-multi-comp': 'off',
        'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
        'react/require-default-props': [
            'error',
            {
                functions: 'defaultArguments',
            },
        ],
        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    // Packages
                    [
                        '^react',
                        '^next',
                        '^recoil',
                        '^react-hook-form',
                        '^@hookform/resolvers',
                        '^@testing-library',
                        '^zustand',
                        'zod',
                    ],

                    // UI and mocks
                    ['^@/components/ui', '^@/components', '^@/mocks', '^\\./'],

                    // Logic
                    ['^@/stores', '^@/utils', '^@/theme'],

                    // Types, assets and style
                    ['^@/types', '^@/\\.\\./public'],
                ],
            },
        ],
        'simple-import-sort/exports': 'error',
        'unicorn/filename-case': 'off',
        'unicorn/no-keyword-prefix': 'off',
        'unicorn/numeric-separators-style': [
            'error',
            { number: { minimumDigits: 0, groupLength: 3 } },
        ],
        'unicorn/string-content': [
            'error',
            {
                patterns: {
                    "'": '’',
                    '\\.\\.\\.': '…',
                    '^http:\\/\\/': '^https:\\/\\/',
                },
            },
        ],
    },
}
