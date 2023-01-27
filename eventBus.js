// 任务队列
const eventBus = {
  queueMap: {},
  on: (name, fn) => {
    eventBus.queueMap[name] = eventBus.queueMap[name] || [];
    eventBus.queueMap[name].push(fn)
  },
  off: (name, fn) => {
    const index = eventBus.queueMap[name]?.findIndex(eve => eve === fn);
    if (index !== -1 && index !== undefined) eventBus.queueMap[name].splice(index, 1)
  },
  emit: (name, data) => {
    eventBus.queueMap[name]?.forEach(eve => {
      eve?.call(undefined, data);
    });
  },
  once: (name, fn) => {
    const once = (...args) => {
      fn.call(undefined, ...args);
      eventBus.off(name, once)
    }
    eventBus.on(name, once)
  }
}


const fn = (arg) => {
  console.log('clicked', arg);
}
const f1 = (arg) => {
  console.log('clicked once', arg);
}
eventBus.on('click', fn);
eventBus.once('click', f1)
setTimeout(() => {
  eventBus.emit('click', 'test')
}, 1000)
setTimeout(() => {
  eventBus.emit('click', 'test2');
  eventBus.off('click', fn);
}, 1000)
setTimeout(() => {
  eventBus.emit('click', 'test3');
}, 1000)