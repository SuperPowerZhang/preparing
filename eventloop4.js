Promise.resolve().then(() => {
  // 微任务1
  console.log("Promise1");
  setTimeout(() => {
    // 宏任务2
    console.log("setTimeout2");
  }, 0);
});
setTimeout(() => {
  // 宏任务1
  console.log("setTimeout1");
  Promise.resolve().then(() => {
    // 微任务2
    console.log("Promise2");
  });
}, 0);


// Promise1 => setTimeout1 => Promise2 => setTimeout2