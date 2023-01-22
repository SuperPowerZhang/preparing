//  前一个任务执行完了才喊后面的任务执行

/* 实现一个LazyMan，可以按照以下方式调用:
LazyMan('Hank')输出:
Hi! This is Hank!

LazyMan('Hank').sleep(10).eat('dinner')输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~

LazyMan('Hank').eat('dinner').eat('supper')输出
Hi This is Hank!
Eat dinner~
Eat supper~

LazyMan('Hank').sleepFirst(5).eat('supper')输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
以此类推。*/

function LazyMan(name) {
  const tasks = [];
  function next() {
    tasks.shift()?.();
  }

  tasks.push(() => {
    console.log(`Hi! This is ${name}!`);
    next();
  })

  const apis = {
    sleep(number) {
      tasks.push(() => {
        setTimeout(() => {
          console.log(`Wake up after ${number}`);
          next();
        }, number * 1000)
      });
      return apis;
    },
    eat(content) {
      tasks.push(() => {
        console.log(`Eat ${content}`);
        next();
      })
      return apis;
    },
    sleepFirst(number) {
      tasks.unshift(() => {
        setTimeout(() => {
          console.log(`Wake up after ${number}`);
          next();
        }, number * 1000)
      });
      return apis;
    },
  }

  setTimeout(() => {
    next();
  }, 0);

  return apis;
}

// LazyMan('Hank');
// LazyMan('Hank').sleep(10).eat('dinner');
// LazyMan('Hank').eat('dinner').eat('supper');
// LazyMan('Hank').sleepFirst(5).eat('supper')

// 方案二： 声明对象_lazyMan, 上面的 return apis 都变成this，方法都挂在_lazyMan上面