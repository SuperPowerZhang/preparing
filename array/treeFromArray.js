const input1 = [
  {
    id: 1,
    description: 'Do you have a pet?',
    subquestions: [2],
    children: [
      {
        id: 2,
        description: 'What types of pet do you have?',
        subquestions: [3],
        children: [
          {
            id: 3,
            description: 'Please specify your pet if choose other?',
            subquestions: []
          }
        ]
      }
    ]
  }
];
const output1 = [
  {
    id: 1,
    description: 'Do you have a pet?',
    subquestions: [2]
  },
  {
    id: 2,
    description: 'What types of pet do you have?',
    subquestions: [3]
  },
  { id: 3, description: 'Please specify your pet if choose other?', subquestions: [] }
];

function treeFromArray(arr) {
  let resArr = [];
  arr.forEach(item => {
    const { children, ...res } = item;
    resArr.push({ ...res });
    if (item.children?.length) {
      resArr.push(...treeFromArray(children));
    }
  });
  return resArr;
}

console.log(222, treeFromArray(input1));
