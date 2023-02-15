class Scheduler2 {
  constructor(count) {
    this.count = 2;
    this.queue = [];
    this.run = [];
  }

  add(task) {
    this.queue.push(task);
    return this.schedule();
  }

  schedule() {
    if (this.run.length < this.count && this.queue.length) {
      const task = this.queue.shift();
      const promise = task().then(() => {
        this.run.splice(this.run.indexOf(promise), 1);
      });
      this.run.push(promise);
      return promise;
    } else {
      //TODO 超过最大执行数量或者没得执行了都走这一行？
      return Promise.race(this.run).then(() => this.schedule());
    }
  }
}

const scheduler = new Scheduler();
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
// output: 2 3 1 4
