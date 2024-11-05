import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default [
	{
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
		ignores: [".husky/**", ".github/**", "package.json", "yarn.lock"], // ignorePatterns를 ignores로 변경
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
