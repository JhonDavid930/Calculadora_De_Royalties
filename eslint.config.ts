// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
    // ─── Global Ignores ─────────────────────────────────────────
    {
        ignores: [
            'dist/',
            'node_modules/',
            'playwright-report/',
            'test-results/',
            '*.config.js',
        ],
    },

    // ─── Base Rules ─────────────────────────────────────────────
    eslint.configs.recommended,

    // ─── TypeScript Strict + Stylistic (Type-Checked) ───────────
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,

    // ─── Parser Options (Type-Aware Linting) ────────────────────
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },

    // ─── React Hooks & Refresh ──────────────────────────────────
    {
        files: ['**/*.{ts,tsx}'],
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
        },
    },

    // ─── Disable Type-Checked on JS Files ───────────────────────
    {
        files: ['**/*.js'],
        extends: [tseslint.configs.disableTypeChecked],
    },

    // ─── Project-Specific Rule Overrides ────────────────────────
    {
        files: ['**/*.{ts,tsx}'],
        rules: {
            // Permitir template literals sin interpolación (common en Tailwind)
            '@typescript-eslint/restrict-template-expressions': 'off',
            // Desactivar reglas pedantes de expresiones void en arrow functions de React
            '@typescript-eslint/no-confusing-void-expression': 'off',
            // Desactivar error por pasar promesas a atributos (ej. onClick async)
            '@typescript-eslint/no-misused-promises': [
                'error',
                {
                    checksVoidReturn: false,
                },
            ],
            // Reducir severidad de `any` para no saturar si hay librerías sin tipos perfectos
            '@typescript-eslint/no-unsafe-assignment': 'warn',
            '@typescript-eslint/no-unsafe-member-access': 'warn',
            '@typescript-eslint/no-unsafe-call': 'warn',
            // Desactivar reglas que requieren strictNullChecks explícito (falsos positivos en configs)
            '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
            '@typescript-eslint/no-unnecessary-condition': 'off',
            '@typescript-eslint/no-useless-default-assignment': 'off',
            '@typescript-eslint/prefer-nullish-coalescing': 'off',
            // Permitir promesas flotantes (común en UI triggers y custom hooks)
            '@typescript-eslint/no-floating-promises': 'off',
            // Permitir borrar keys dinámicas (usado en tests y clonado de objetos)
            '@typescript-eslint/no-dynamic-delete': 'off',
            // Relax para React Root (! assertion) y type conversions menores
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-unnecessary-type-conversion': 'off',
            '@typescript-eslint/no-empty-function': 'off',
        },
    },

    // ─── Test Files: Relaxed Rules ──────────────────────────────
    {
        files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
        rules: {
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/unbound-method': 'off',
        },
    },
];
