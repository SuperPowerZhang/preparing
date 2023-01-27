function getDebounceFunction(fn, time) {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(undefined, ...args);
      timer = null;
    }, time)
  }
}
