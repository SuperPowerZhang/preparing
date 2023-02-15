// Promise
class Scheduler {
  constructor() {
    // to do
    this.limit = 2;
    this.queue = [];
    this.executing = [];
  }
  async add(fn) {
    this.queue.push(fn);
    console.log(this.queue);
    return this.run();
  }
  run() {
    if (this.executing.length < this.limit && this.queue.length) {
      const temp = this.queue.shift();
      const promise = temp().then(res => {
        let curIndex = this.executing.indexOf(promise);
        this.executing.splice(curIndex, 1);
      });
      this.executing.push(promise);
      return promise;
    } else {
      return Promise.race(this.executing).then(() => this.run());
    }
  }
}

const timeout = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};
addTask(400, 4);
addTask(200, 2);
addTask(400, 3);
addTask(100, 1);
