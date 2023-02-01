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

const types = Object.keys(typeMap).map(type => {
  return {
    value: `${typeMap[type].emoji} ${type}`,
    name: `${typeMap[type].emoji} ${type}:    ${typeMap[type].description} `
  }
})

const typesForRules = Object.keys(typeMap).map(type => {
  return `${typeMap[type].emoji} ${type}`
})

const typeEnumForQuestions = {};

Object.keys(typeMap).forEach(type => {
  const key = `${typeMap[type].emoji} ${type}`
  typeEnumForQuestions[key] = typeMap[type];
})

module.exports = {
  types,
  typesForRules,
  typeEnumForQuestions
}