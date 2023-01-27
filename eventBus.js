// 任务队列
const eventBus = {
  queueMap: {},
  on: function (name, fn) {
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
  }
}


const fn = (arg) => {
  console.log('clicked', arg);
}
eventBus.on('click', fn)
setTimeout(() => {
  eventBus.emit('click', 'test')
  eventBus.off('click', fn);
}, 1000)
setTimeout(() => {
  eventBus.emit('click', 'test2')
}, 1000)
