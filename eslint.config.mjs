import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,  // Node.js 전역변수 추가
        process: 'readonly'  // process를 전역변수로 명시적 선언
      }
    },
  },
  {
    rules: {
      'no-process-env': 'off',  // process.env 사용 허용
      'no-process-exit': 'off'  // process.exit() 사용 허용
    }
  },
  // Electron 메인 프로세스와 렌더러 프로세스 파일 구분
  {
    files: ["main.js", "electron/**/*"],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },
  {
    files: ["src/**/*"],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
];