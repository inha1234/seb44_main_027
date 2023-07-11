module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/prop-types": "off",
  },

  // 사용되지 않는 props, import react 오류 줄 제거를 위한 설정을 추가하였습니다. 문제 시 아래의 내용은 삭제하셔도 됩니다.
  //   "no-unused-vars": [
  //     "error",
  //     {
  //       vars: "all",
  //       args: "none",
  //       ignoreRestSiblings: false,
  //       caughtErrors: "none",
  //     },
  //   ],
  //   "react/jsx-uses-react": "off",
  //   "react/jsx-uses-vars": "error",
  // },
};
