const promise = new Promise((resolve, reject) => {
  //   一旦状态改变，就不会再变。
  // 所以 代码中的reject('error'); 不会有作用。

  // Promise 只能 resolve 一次，剩下的调用都会被忽略。
  // 所以 第二次的 resolve('success2'); 也不会有作用。
  resolve('success1');
  reject('error');
  resolve('success2');
});

promise
  .then(res => {
    console.log('then:', res);
  })
  .catch(err => {
    console.log('catch:', err);
  });

// then: success1

// then 方法接受的参数是函数，而如果传递的并非是一个函数，它实际上会将其解释为 then(null)，这就会导致前一个 Promise 的结果会穿透下面。
Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log);

// 1

// 红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次；如何让三个灯不断交替重复亮灯？（用Promise实现）三个亮灯函数已经存在：
function red() {
  console.log('red');
}
function green() {
  console.log('green');
}
function yellow() {
  console.log('yellow');
}

var light = function (timer, cb) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      cb();
      resolve();
    }, timer);
  });
};
var step = function () {
  Promise.resolve()
    .then(function () {
      return light(3000, red);
    })
    .then(function () {
      return light(2000, green);
    })
    .then(function () {
      return light(1000, yellow);
    })
    .then(function () {
      step();
    });
};
// step();
