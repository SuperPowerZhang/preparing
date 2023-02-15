Promise.allSettled = function (promiseArr) {
  const len = promiseArr.length;
  let count = 0;
  const res = new Array(len).fill(null);
  return new Promise((resolve, reject) => {
    promiseArr.forEach((pro, index) => {
      // 非promise类型调用then会报错
      Promise.resolve(pro).then(data => {
        res[index] = { status: 'fulfilled', value: data };
        count += 1;
        if (count === len) {
          resolve(res);
        }
      }, err => {
        res[index] = { status: 'rejected', reason: err };
        count += 1;
        if (count === len) {
          resolve(res);
        }
      })
    })
  })
}

var p1 = Promise.resolve(3);
var p2 = 1337;
var p3 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, 'foo');
});

Promise.allSettled([p1, p2, p3]).then(values => {
  console.log(values);
  // [{ status: 'fulfilled', value: 3 }, { status: 'fulfilled', value: 1337 },{ status: 'rejected', reason: 'foo' }]
});
