
function currying(fn, ...args1) {
  // args没有...的话只能拿到第一个参数
  // 这里的this 是undefined
  const allArgs = [...args1];
  const next = (...args2) => {
    allArgs.push(...args2);
    return allArgs.length >= fn.length ? fn.apply(undefined, allArgs) : next
  }
  return next
}


// 需要约定一下？ '_'为占位符，
function currifyWithHoles(fn, ...args1) {
  // args没有...的话只能拿到第一个参数
  // 这里的this 是undefined
  let allArgs = [];
  let holes = []; // 存储占位符在的位置
  function checkArgs(args) {
    args.length && args.forEach((arg, index) => {
      if (!holes.length && arg !== '_') {
        allArgs.push(arg);
      } else {
        if (arg === '_') {
          holes.push(index)
        } else {
          const minHole = holes.shift();
          // 避免了在遍历自己的时候给之前的hole搞没了
          if (minHole >= index) {
            allArgs.splice(minHole, 0, arg);
          } else {
            allArgs.push(arg);
            holes.unshift(minHole)
          }
        }
      }
    })
  }
  checkArgs(args1);
  const next = (...args2) => {
    checkArgs(args2);
    if (allArgs.length >= fn.length) {
      const res = fn.apply(undefined, allArgs);
      allArgs = []
      holes = [];
      return res
    } else {
      return next
    }
  }
  return next
}



/** 测试代码 **/
function sayHello(name, age, fruit) {
  console.log(`我叫 ${name},我 ${age} 岁了, 我喜欢吃 ${fruit}`)
}

const showMsg = currying(sayHello);
showMsg('小衰', 20)('西瓜')

const betterShowMsg = currifyWithHoles(sayHello)
betterShowMsg('_', 20)('小衰', '_', '西瓜')          // 我叫 小衰,我 20 岁了, 我喜欢吃 西瓜
betterShowMsg('_', '_', '南瓜')('小猪')(25)          // 我叫 小猪,我 25 岁了, 我喜欢吃 南瓜
betterShowMsg('小明')('_', 22)('_', '_', '倭瓜')          // 我叫 小明,我 22 岁了, 我喜欢吃 倭瓜
betterShowMsg('小拽')(28)('冬瓜')          // 我叫 小拽,我 28 岁了, 我喜欢吃 冬瓜
