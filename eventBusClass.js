// 任务队列
class eventBus {
  queueMap = {}
  on(name, fn) {
    this.queueMap[name] = this.queueMap[name] || [];
    this.queueMap[name].push(fn)
  }
  off(name, fn) {
    const index = this.queueMap[name]?.findIndex(eve => eve === fn);
    if (index !== -1 && index !== undefined) this.queueMap[name].splice(index, 1)
  }
  emit(name, data) {
    this.queueMap[name]?.forEach(eve => {
      eve?.call(undefined, data);
    });
  }
  once(name, fn) {
    const once = (...args) => {
      fn.call(undefined, ...args);
      this.off(name, once)
    }
    this.on(name, once)
  }
}


const fn = (arg) => {
  console.log('clicked', arg);
}
const f1 = (arg) => {
  console.log('clicked once', arg);
}
const bus1 = new eventBus();
bus1.on('click', fn);
bus1.once('click', f1)
setTimeout(() => {
  bus1.emit('click', 'test')
  setTimeout(() => {
    bus1.emit('click', 'test2');
    bus1.off('click', fn);
    setTimeout(() => {
      bus1.emit('click', 'test3');
    }, 1000)
  }, 1000)
}, 1000)

