Array.prototype.flat = function (layer) {
  return flat1.call(this, this, layer);
};

function flat1(arr, layer) {
  const _this = arr ?? this;
  if (layer <= 0) {
    return _this;
  } else if (layer === undefined) {
    return _this?.reduce((pre, cur) => {
      return pre.concat(Array.isArray(cur) ? [...cur] : [cur]);
    }, []);
  } else {
    return _this?.reduce((pre, cur) => {
      return pre.concat(Array.isArray(cur) ? flat1(cur, layer - 1) : cur);
    }, []);
  }
}

// * 可以用栈实现完全拉平
function flat(arr) {
  const result = [];
  const stack = [].concat(arr); // 将数组元素拷贝至栈，直接赋值会改变原数组
  //如果栈不为空，则循环遍历
  while (stack.length !== 0) {
    const val = stack.pop();
    if (Array.isArray(val)) {
      stack.push(...val); //如果是数组再次入栈，并且展开了一层
    } else {
      result.unshift(val); //如果不是数组就将其取出来放入结果数组中
    }
  }
  return result;
}

//  forEach(), filter(), reduce(), every() 和 some() 都会跳过空位
// 用这些实现的flat也可以

const animals = ['🐷', , , ['🐶', '🐂'], , , , ['🐎', ['🐑', ['🐲']], '🐛']];

// 不传参数时，默认“拉平”一层
console.log(333, animals.flat(Infinity));
// ["🐷", "🐶", "🐂", "🐎", ["🐑", ["🐲"]], "🐛"]

// // 传入一个整数参数，整数即“拉平”的层数
// animals.flat(2);
// // ["🐷", "🐶", "🐂", "🐎", "🐑", ["🐲"], "🐛"]

// // Infinity 关键字作为参数时，无论多少层嵌套，都会转为一维数组
// animals.flat(Infinity);
// // ["🐷", "🐶", "🐂", "🐎", "🐑", "🐲", "🐛"]

// // 传入 <=0 的整数将返回原数组，不“拉平”
// animals.flat(0);
// animals.flat(-10);
// // ["🐷", ["🐶", "🐂"], ["🐎", ["🐑", ["🐲"]], "🐛"]];

// 如果原数组有空位，flat()方法会跳过空位。
// ['🐷', '🐶', '🐂', '🐎', ,].flat();
// // ["🐷", "🐶", "🐂", "🐎"]

// Generator 和 yield 还是看不太懂
function* flat(arr, num) {
  if (num === undefined) num = 1;
  for (const item of arr) {
    if (Array.isArray(item) && num > 0) {
      // num > 0
      yield* flat(item, num - 1);
    } else {
      yield item;
    }
  }
}
