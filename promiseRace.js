Promise.all = function (promiseArr) {
  const len = promiseArr.length;
  return new Promise((resolve, reject) => {
    promiseArr.forEach(pro => {
      // 非promise类型调用then会报错
      Promise.resolve(pro).then(data => {
        resolve(data);
      }, err => {
        reject(err);
      })
    })
  })
}

var p1 = Promise.resolve(3);
var p2 = 1337;
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.race([p2, p1, p3]).then(values => {
  console.log(values);
});

// TODO race 、allSettled、race