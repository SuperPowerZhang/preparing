function limitQueueFn(arrs, limit) {
  return new Promise((resolve, reject) => {
    let resolvedCount = 0;
    const len = arrs.length;
    let index = 0;
    let res = [];
    function next(p, index) {
      p().then(data => {
        // 需要按照原来的顺序存储结果的话 需要把i传进来
        res[index] = data;
        resolvedCount++;
        if (arrs.length) {
          let p = arrs.shift();
          next(p, len - arrs.length - 1);
        } else if (resolvedCount === len) {
          resolve(res);
        }
      });
    }
    while (index < limit && arrs.length) {
      next(arrs.shift(), len - arrs.length - 1);
      index++;
    }
  });
}

const promiseFactory = (res, timeout) => {
  return () =>
    new Promise(resolve => {
      console.count('get in pool');
      setTimeout(() => {
        resolve(res);
      }, timeout);
    });
};
console.log('start');
console.log('executing...');
limitQueueFn(
  [
    promiseFactory(1, 1000),
    promiseFactory(2, 2000),
    promiseFactory(3, 2000),
    promiseFactory(4, 1000),
    promiseFactory(5, 1000),
    promiseFactory(6, 500),
    promiseFactory(7, 500)
  ],
  3
).then(res => {
  const str = res.join(',');
  console.log(str);
  console.timeEnd('start');
});
