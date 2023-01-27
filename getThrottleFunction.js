
//  技能冷却
function getThrottleFunction(fn, time) {
  let timer = null;
  return (...args) => {
    if (timer) return
    fn.call(undefined, ...args);
    throttling = true;
    timer = setTimeout(() => {
      timer = null;
    }, time)
  }
}

