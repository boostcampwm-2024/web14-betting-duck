import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default [
	{
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
		ignores: [
			"**/node_modules/**",
			"**/dist/**",
			"**/build/**",
			"coverage/**",
			"**/.next/**",
			".husky/**/*.js", // husky 스크립트 무시
			"frontend/dist/**/*", // frontend/dist 명시적으로 무시
			"**/frontend/dist/**", // 모든 경로의 frontend/dist 무시
			"frontend/dist/assets/**", // frontend/dist/assets 명시적으로 무시
		],
	},
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				process: "readonly",
			},
		},
	},
	{
		files: [".husky/**/*.js"],
		rules: {
			"@typescript-eslint/no-require-imports": "off",
			"@typescript-eslint/no-var-requires": "off",
		},
	},
	{
		rules: {
			"no-process-env": "off",
			"no-process-exit": "off",
		},
	},
	{
		files: ["main.js", "electron/**/*"],
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},
	{
		files: ["src/**/*"],
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	prettier,
];
