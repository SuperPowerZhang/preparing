// 1、使用prototype
function Cat(name) {
  this.name = name;
}

Cat.prototype.miao = function () {
  console.log("miao")
}

const c1 = new Cat("小花");
c1.miao();

// 2、使用class
// class 无法实现在prototype上添加非函数的属性 
class Dog {
  kind = '狗';// 等价于在constructor中写
  constructor(name) {
    this.name = name;
  }
  run() {
    console.log('哈拉哈拉跑');
  }
}

const d1 = new Dog();
d1.run();

