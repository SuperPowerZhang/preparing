/** @type {import('cz-git').UserConfig} */

const {
  typeEnumForQuestions, typesForRules
} = require('./xxxxx.js')

module.exports = {
  alias: { fd: 'docs: fix typos' },
  messages: {
    type: 'Select the type of change that you\'re committing:',
    scope: 'Denote the SCOPE of this change (optional):',
    customScope: 'Denote the SCOPE of this change:',
    subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: 'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
    footerPrefixesSelect: 'Select the ISSUES type of changeList by this change (optional):',
    customFooterPrefix: 'Input ISSUES prefix:',
    footer: 'List any ISSUES by this change. E.g.: #31, #34:\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?'
  },
  types: [
    { value: "feat", name: "feat:     ✨  A new feature", emoji: ":sparkles:" },
    { value: "fix", name: "fix:      🐛  A bug fix", emoji: ":bug:" },
    { value: "docs", name: "docs:     📝  Documentation only changes", emoji: ":memo:" },
    { value: "style", name: "style:    💄  Changes that do not affect the meaning of the code", emoji: ":lipstick:" },
    { value: "refactor", name: "refactor: ♻️   A code change that neither fixes a bug nor adds a feature", emoji: ":recycle:" },
    { value: "perf", name: "perf:     ⚡️  A code change that improves performance", emoji: ":zap:" },
    { value: "test", name: "test:     ✅  Adding missing tests or correcting existing tests", emoji: ":white_check_mark:" },
    { value: "build", name: "build:    📦️   Changes that affect the build system or external dependencies", emoji: ":package:" },
    { value: "ci", name: "ci:       🎡  Changes to our CI configuration files and scripts", emoji: ":ferris_wheel:" },
    { value: "chore", name: "chore:    🔨  Other changes that don't modify src or test files", emoji: ":hammer:" },
    { value: "revert", name: "revert:   ⏪️  Reverts a previous commit", emoji: ":rewind:" }
  ],
  // 下面这个可能是为了校验用的 emoji好像还是得自己手动加 难受
  useEmoji: true,
  emojiAlign: 'center',
  themeColorCode: '',
  // 结合commitlint 可以在这里做更多的配置 scopes的范围
  scopes: [],
  allowEmptyScopes: false,
  customScopesAlign: 'bottom',
  customScopesAlias: 'custom',
  emptyScopesAlias: 'empty',
  markBreakingChangeMode: false,
  breaklineNumber: 100,
  breaklineChar: '|',
  skipQuestions: ['breaking', 'footerPrefix', 'footer', 'confirmCommit'],
  issuePrefixes: [{ value: 'closed', name: 'closed:   ISSUES has been processed' }],
  customIssuePrefixAlign: 'top',
  emptyIssuePrefixAlias: 'skip',
  customIssuePrefixAlias: 'custom',
  allowCustomIssuePrefix: true,
  allowEmptyIssuePrefix: true,
  confirmColorize: true,
  maxHeaderLength: Infinity,
  maxSubjectLength: Infinity,
  minSubjectLength: 0,
  scopeOverrides: undefined,
  defaultBody: '',
  defaultIssues: '',
  defaultScope: '',
  defaultSubject: '',

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
}

