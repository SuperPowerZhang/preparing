// 异步函数fn1
const fn1 = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('111');
    }, 500);
  });
};

// 异步函数fn2
const fn2 = data => {
  return new Promise((resolve, reject) => {
    resolve(data + '222');
  });
};

// 异步函数fn3
const fn3 = data => {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(data + '333');
    }, 1000);
  });
};

// 1、链式调用
fn1()
  .then(data => {
    return fn2(data);
  })
  .then(data => {
    return fn3(data);
  })
  .then(data => {
    console.log(data); // 111222333
  });

// 2、await
async function queue(promies) {
  let res;
  for (let pro of promies) {
    res = await pro(res);
  }
  return res;
}

// 因为async返回返回的也是promise，所以可以使用then
queue([fn1, fn2, fn3]).then(data => {
  console.log(data); // 111222333
});
