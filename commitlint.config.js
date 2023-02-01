const {
  types,
  typesForRules,
  typeEnumForQuestions
} = require('./commitlint.config.type.js');
const CONFIG_COMMON = require('./commitlint.config.common')

module.exports = {
  ...CONFIG_COMMON,
  types,
  scopes: [],
  upperCaseSubject: true,
  footerPrefix: "Related issue:",
  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix", "refactor"],
  rules: {
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case']
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [0, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    // 控制不输入body question 
    'body-empty': [2, 'always'],
    'footer-empty': [2, 'always'],
    'type-enum': [
      2,
      'always',
      typesForRules
    ]
  },
  // 12版本的@commitlint/load拿不到prompt
  prompt: {
    settings: {},
    messages: {
      skip: '(press enter to skip)',
      max: '(max %d chars)',
      min: '(min %d chars)',
      emptyWarning: '(%s is required)',
      upperLimitWarning: '%s is %d characters longer than the upper limit',
      lowerLimitWarning: '%s is %d characters less than the lower limit',
    },
    questions: {
      type: {
        description: "Select the type of change that you're committing:",
        enum: typeEnumForQuestions
      },
      scope: {
        description:
          'What is the scope of this change (e.g. component or file name)',
      },
      subject: {
        description: 'Write a short, imperative tense description of the change',
      }
    }
  }
};
