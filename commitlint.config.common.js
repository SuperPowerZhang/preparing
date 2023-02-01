const { typesForRules } = require('./commitlint.config.type.js');

module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(.*?)(?:\((.*)\))?: (.*)$/,
    }
  },
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'perf', 'test', ...typesForRules]
    ],
  }
};