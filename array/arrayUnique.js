// Array.indexOf 底层还是使用 === 进行判断，因为 NaN === NaN的结果为 false，所以使用 indexOf 查找不到 NaN 元素
// Set 认为尽管 NaN === NaN 为 false，但是这两个元素是重复的

// set
function unique1(arr) {
  return Array.from(new Set(arr));
  // [...new Set(arr)]
}

// 计数排序 与下面的Map类似，但是直接用object，缺点是key是字符串导致一些数据类型的结果不对

// Map  Map 的key可以是任意数据类型
// 缺点是兼容性
function unique3(arr) {
  const arrMap = new Map();
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === undefined) {
      continue;
    }
    if (!arrMap.has(arr[i])) {
      arrMap.set(arr[i], true);
    }
  }
  return [...arrMap.keys()];
}

// 排序后去重与上一个比较就可以了
function unique4(array) {
  var res = [];
  var sortedArray = array.concat().sort();
  var seen;
  for (var i = 0, len = sortedArray.length; i < len; i++) {
    // 如果是第一个元素或者相邻的元素不相同
    if (!i || seen !== sortedArray[i]) {
      res.push(sortedArray[i]);
    }
    seen = sortedArray[i];
  }
  return res;
}

function unique5(array) {
  var res = array.filter(function (item, index, array) {
    return array.indexOf(item) === index;
  });
  return res;
}

const a = [1, '2', 2, 3, 3, 2, 5];
console.log(unique1(a));
console.log(unique3(a));
