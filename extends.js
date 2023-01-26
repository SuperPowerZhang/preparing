// 1、使用prototype
function Animal(kind) {
  this.kind = kind;
}

function Cat(name) {
  // 私有
  Animal.call(this, '猫');
  this.name = name;
}
Cat.prototype.miao = function () {
  console.log("miao")
}

// 公有
Cat.prototype.__proto__ = Animal.prototype; // 被ban了

// 用下面3句替换，为了删除Animal的函数体第3行，因为第7行已经实现了
var f = function () { };
f.prototype = Animal.prototype;
Cat.prototype = new f();

const aa = new Cat();
console.log(aa.kind);

// 2、使用class
class Animal {
  constructor(nickName) {
    this.nickName = nickName;
  }
  eat() {
    console.log('会吃');
  }
}

class Dog extends Animal {
  kind = '狗';// 等价于在constructor中写
  constructor(name) {
    super('汪');  // super需要写在上面
    this.name = name;
  }
  run() {
    console.log('哈拉哈拉跑');
  }
}

const d1 = new Dog();
d1.run();

