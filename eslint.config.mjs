import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default [
	{
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
		ignores: [
			"**/node_modules/**",
			"**/dist/**",
			"**/build/**",
			"coverage/**",
			"**/.next/**",
			".husky/**/*.js",
			// frontend/dist 관련 모든 파일을 명확하게 무시
			"frontend/dist/**",
			"**/frontend/dist/**/*.*",
			// dist 디렉토리 아래의 모든 것을 재귀적으로 무시
			"dist/**/*",
			// assets 디렉토리도 명시적으로 무시
			"**/assets/**",
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
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	prettier,
];
