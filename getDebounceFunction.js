function getDebounceFunction(fn, time) {
  let timer = null;
  const debounce = (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(undefined, ...args);
      timer = null;
    }, time);
  };
  return debounce;
}

// 第四版 immediate增加了立即执行的功能
function debounce(func, wait, immediate) {
  var timeout;

  const debounce = function () {
    var context = this;
    var args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 如果已经执行过，不再执行
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
  };

  // 增加取消功能，执行后可以取消当前防抖
  debounce.cancel = () => {
    if (timeout) clearTimeout(timer);
    timeout = null;
  };
  return debounce;
}
