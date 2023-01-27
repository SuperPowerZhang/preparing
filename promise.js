const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class Promise {
  #status = PENDING;
  #val = undefined;
  #reason = undefined;
  queue = [];
  constructor(execuctor) {
    let resolve = (data) => {
      if (this.#status === PENDING) {
        this.#status = FULFILLED;
      }
      this.#val = data;
      if (this.queue.length) {
        const p1p2 = this.queue.shift();
        const res = p1p2[0].call(undefined, data);
        // 这里仅判断了Promise 和 非Promise 2 种类型，相当于非Promise.reject都视为成功了
        if (res instanceof Promise) {
          res.then(data => {
            resolve(data)
          }, err => {
            reject(err)
          })
        } else {
          resolve(res);
        }
      }
    }
    let reject = (reason) => {
      if (this.#status === PENDING) {
        this.#status = REJECTED;
      }
      this.#reason = reason;
      if (this.queue.length) {
        const p1p2 = this.queue.shift();
        const res = p1p2[1].call(undefined, reason);
        // 这里仅判断了Promise 和 非Promise 2 种类型，相当于非Promise.reject都视为成功了
        if (res instanceof Promise) {
          res.then(data => {
            resolve(data)
          }, err => {
            reject(err)
          })
        } else {
          resolve(res);
        }
      }
    }
    try {
      execuctor.call(undefined, resolve, reject);
    } catch (e) {
      reject(e)
    }
  }

  then(success, fail) {
    this.queue.push([success, fail]);
    // TODO 链式调用
    // return new Promise((resolve, reject) => {
    //   if (this.#status === FULFILLED) {
    //     const res1 = success(this.#val);
    //   } else if (this.#status === FAILED) {

    //   } else {

    //   }
    // })
  }
}

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('ggggg')
  }, 1000)
})
p1.then((data) => {
  console.log(1111, 'chenggong', data);
}, (err) => {
  console.log(1111, 'shibai', err);
})