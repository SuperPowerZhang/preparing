const arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, 'string', { name: '111' }];

// 4种方法
arr instanceof Array;
// true
arr.constructor === Array;
// true
Object.prototype.toString.call(arr) === '[object Array]';
// true
Array.isArray(arr);
