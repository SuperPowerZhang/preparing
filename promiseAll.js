Promise.all = function (list) {
  const len = list.length;
  let count = 0;
  const res = new Array(len).fill(null);
  return new Promise((resolve, reject) => {
    list.forEach((pro, index) => {
      // 非promise类型调用then会报错
      Promise.resolve(pro).then(data => {
        res[index] = data;
        count += 1;
        if (count === len) {
          resolve(res);
        }
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

Promise.all([p1, p2, p3]).then(values => {
  console.log(values); // [3, 1337, "foo"]
});