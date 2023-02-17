function PromiseNew(fn) {
  let state = 'pending';
  let value = undefined;
  let error = undefined;
  let callbacks = [];
  function resolve(newValue) {
    const fn = () => {
      if (state !== 'pending') return;

      // TODO 如果resolve里面塞的还是Promise，就继续调用
      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        const { then } = newValue;
        if (typeof then === 'function') {
          // newValue 为新产生的 Promise,此时resolve为上个 promise 的resolve
          //相当于调用了新产生 Promise 的then方法，注入了上个 promise 的resolve 为其回调
          then.call(newValue, resolve, reject);
          return;
        }
      }
      state = 'fulfilled';
      value = newValue;
      handelCb();
    };

    setTimeout(fn, 0); //基于 PromiseA+ 规范
  }

  function handle(callback) {
    if (this.status === 'pending') {
      callbacks.push(callback);
    }
    const cb = state === 'fulfilled' ? callback.onFulfilled : callback.onRejected;
    const next = state === 'fulfilled' ? callback.resolve : callback.reject;
    if (!cb) {
      next(value);
      return;
    }
    try {
      const ret = cb(value);
      next(ret);
    } catch (e) {
      callback.reject(e);
    }
  }

  function reject() {
    const fn = () => {
      if (state !== 'pending') return;

      if (error && (typeof error === 'object' || typeof error === 'function')) {
        const { then } = error;
        if (typeof then === 'function') {
          then.call(error, resolve, reject);
          return;
        }
      }
      state = 'rejected';
      value = error;
      handelCb();
    };
    setTimeout(fn, 0);
  }

  function handelCb() {
    // TODO while还是if？
    if (callbacks.length) {
      const fulfiledFn = callbacks.shift();
      handle(fulfiledFn);
    }
  }
  fn(resolve, reject);

  this.then = function (onFulfilled, onFailed) {
    return new Promise((resolve, reject) => {
      handle({
        onFulfilled,
        onFailed,
        resolve
      });
    });
  };
  this.catch = function (onError) {
    this.then(null, onError);
  };
  this.finally = function (onDone) {
    this.then(onDone, onDone);
  };
  this.resolve = function (value) {
    if (value && value instanceof Promise) {
      return value;
    } else if (value && typeof value === 'object' && typeof value.then === 'function') {
      let then = value.then;
      return new Promise(resolve => {
        then(resolve);
      });
    } else if (value) {
      return new Promise(resolve => resolve(value));
    } else {
      return new Promise(resolve => resolve());
    }
  };
  this.reject = function (value) {
    return new Promise(function (resolve, reject) {
      reject(value);
    });
  };
}
