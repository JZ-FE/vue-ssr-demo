// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.config.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    'import/first': ['error', 'never'],
    'no-param-reassign': ['error', {
      'props': false
    }],
    'no-underscore-dangle': 'off',
    'semi': ['error', 'never'],
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'always',
      'asyncArrow': 'always'
    }],

    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
