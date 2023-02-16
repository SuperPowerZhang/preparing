//  empty1 是 undefined 也不见了，f1 f2不见了
// {
//   number: 1,
//   bool: false,
//   str: 'hi',
//   empty2: null,
//   array: [ { name: 'frank', age: 18 }, { name: 'jacky', age: 19 } ],
//   date: '2000-01-01T12:30:00.000Z',
//   regex: {},
//   obj: { name: 'haha', age: 18 }
// }
function deepClone1(data) {
  return JSON.parse(JSON.stringify(data));
}

// 判断是箭头函数还是普通函数
// dom元素、跨iframe窗口都不行
const deepClone2 = (data, cache) => {
  let cloneData;
  if (!cache) cache = new Map();
  if (cache.get(data)) return cache.get(data);
  if (data instanceof Object) {
    if (data instanceof Function) {
      if (data.prototype) {
        cloneData = function () {
          return data.call(this, arguments);
        };
      } else {
        cloneData = (...args) => {
          return data.call(undefined, ...args);
        };
      }
    } else if (data instanceof Array) {
      cloneData = [];
    } else if (data instanceof Date) {
      cloneData = new Date(data - 0);
    } else if (data instanceof RegExp) {
      cloneData = new RegExp(data.source, data.flags);
    } else {
      cloneData = {};
    }
    cache.set(data, cloneData);
    for (let key in data) {
      // 注意继承属性
      if (data.hasOwnProperty(key)) {
        cloneData[key] = deepClone2(data[key], cache);
      }
    }
    return cloneData;
    // Object.prototype.toString.call(Symbol(111))
    // typeof data === 'symbol'
  } else if (Object.prototype.toString.call(data) === '[object Symbol]') {
    cloneData = Object(Symbol.prototype.valueOf.call(origin));
  } else {
    cloneData = data;
    return cloneData;
  }
};

const a = {
  number: 1,
  bool: false,
  str: 'hi',
  empty1: undefined,
  empty2: null,
  array: [
    { name: 'frank', age: 18 },
    { name: 'jacky', age: 19 }
  ],
  date: new Date(2000, 0, 1, 20, 30, 0),
  regex: /\.(j|t)sx/i,
  obj: { name: 'frank', age: 18 },
  f1: (a, b) => a + b,
  f2: function (a, b) {
    return a + b;
  }
};

// a.self = a
const b = deepClone2(a);
b.obj.name = 'haha';
console.log(b);
console.log(a);

// b.self === b // true b.self = 'hi' a.self !== 'hi' //true
