function sayHello(name, age, fruit) {
  console.log(console.log(`我叫 ${name},我 ${age} 岁了, 我喜欢吃 ${fruit}`))
}

const curryingShowMsg1 = currying(sayHello, '小明')
curryingShowMsg1(22, '苹果')            // 我叫 小明,我 22 岁了, 我喜欢吃 苹果

const curryingShowMsg2 = currying(sayHello, '小衰', 20)
curryingShowMsg2('西瓜')               // 我叫 小衰,我 20 岁了, 我喜欢吃 西瓜


const curryingShowMsg3 = currying(sayHello)
curryingShowMsg3('haha', 20, 'banana')

// ...args


function currying(fn, ...args1) {
  // args没有...的话只能拿到第一个参数
  return (...args2) => {
    // console.log(args1, args2, typeof args2);
    // this问题 这里直接用了undefined——暂时好像也没有问题？
    fn.apply(undefined, args1.concat(args2))
  }
}

