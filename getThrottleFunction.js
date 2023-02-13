//  技能冷却
function getThrottleFunction(fn, time) {
  let timer = null;
  return (...args) => {
    if (timer) return;
    fn.call(undefined, ...args);
    timer = setTimeout(() => {
      timer = null;
    }, time);
  };
}
