
//  技能冷却
function getThrottleFunction(fn, time) {
  let throttling = false;
  let timer = null;
  return (...args) => {
    if (throttling) return
    fn.call(undefined, ...args);
    throttling = true;
    timer = setTimeout(() => {
      throttling = false;
    }, time)
  }
}
