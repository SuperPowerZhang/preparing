// set
function unique1(arr) {
  return Array.from(new Set(arr))
  // [...new Set(arr)] 
}

// 计数排序 与下面的Map类似，但是直接用object，缺点是key是字符串导致一些数据类型的结果不对

// Map  Map 的key可以是任意数据类型
// 缺点是兼容性
function unique3(arr) {
  const arrMap = new Map();
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === undefined) { continue }
    if (!arrMap.has(arr[i])) {
      arrMap.set(arr[i], true);
    }
  }
  return [...arrMap.keys()]
}

const a = [1, '2', 2, 3, 3, 2, 5];
console.log(unique1(a));
console.log(unique3(a));
