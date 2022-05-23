module.exports = {
  env: {
    node: true,
    es2021: true,
    'vue/setup-compiler-macros': true, // setup语法糖支持直接使用部分api
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    'vue-global-api',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@api', './src/handles/api/'],
          ['@store', './src/store/'],
          ['@column', './src/handles/column/'],
          ['@validate', './src/handles/validate/'],
        ],
      },
    },
  },
  rules: {
    'array-callback-return': 'off', // 强制数组方法的回调函数中有 return 语句
    'consistent-return': 'off', // 函数必须return
    'import/no-extraneous-dependencies': ['error', { devDependencies: true, optionalDependencies: false, peerDependencies: false }], // 引入开发环境依赖插件的处理
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'linebreak-style': ['error', 'unix'], // 换行符规则
    indent: ['error', 2], // 缩进4个空格
    'max-len': 'off', // 行的最大长度
    'no-param-reassign': ['error', { props: false }], // 禁止对函数参数再赋值
    'no-return-assign': ['error', 'except-parens'], // return时：除非用圆括号括起来，否则不允许赋值
    'no-underscore-dangle': 'off',
    'object-curly-newline': 'off', // 强制大括号内换行符的一致性
    semi: [2, 'never'], // 结尾分号
    'vue/multi-word-component-names': 'off', // 组件名命名规则校验
    'vue/no-multiple-template-root': 'off',
  },
  globals: {
    ElMessage: 'readonly',
  },
}
