const typeMap = {
  'feat': {
    description: 'A new feature',
    title: 'Features',
    emoji: '✨',
  },
  'fix': {
    description: 'A bug fix',
    title: 'Bug Fixes',
    emoji: '🐛',
  },
  'docs': {
    description: 'Documentation only changes',
    title: 'Documentation',
    emoji: '📚',
  },
  'refactor': {
    description: 'A code change that neither fixes a bug nor adds a feature',
    title: 'Code Refactoring',
    emoji: '📦',
  },
  'perf': {
    description: 'A code change that improves performance',
    title: 'Performance Improvements',
    emoji: '🚀',
  },
  'test': {
    description: 'Adding missing tests or correcting existing tests',
    title: 'Tests',
    emoji: '🚨',
  }
}



const typeEnumForQuestions = {};
const typesForRules = Object.keys(typeMap).map(type => {
  return `${typeMap[type].emoji} ${type}`
})

Object.keys(typeMap).forEach(type => {
  const key = `${typeMap[type].emoji} ${type}`
  typeEnumForQuestions[key] = typeMap[type];
})

module.exports = {
  typesForRules,
  typeEnumForQuestions
}