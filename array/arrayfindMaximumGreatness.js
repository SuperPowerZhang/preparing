function findMaximumGreatness(arr) {
  const sortedArr = arr?.sort((a, b) => b - a);
  let pre = undefined;
  let cur = undefined;
  let left = 0;
  let res = 0;
  const map = new Map();
  for (let i = 0; i <= sortedArr.length; i++) {
    if (!map.has(sortedArr[i]) || i === sortedArr.length) {
      // console.log(i, map);
      map.set(sortedArr[i], 1);
      if (cur !== undefined && pre !== undefined) {
        if (map.get(pre) + left < map.get(cur)) {
          res += map.get(pre) + left;
          left = 0;
        } else if (map.get(pre) + left >= map.get(cur) && map.get(pre) < map.get(cur)) {
          res += map.get(cur);
          left = map.get(pre) + left - map.get(cur);
        } else if (map.get(pre) >= map.get(cur)) {
          res += map.get(cur);
          left = left + map.get(pre) - map.get(cur);
        }
      }
      if (cur !== undefined) pre = cur;
      cur = sortedArr[i];
    } else {
      map.set(sortedArr[i], map.get(sortedArr[i]) + 1);
    }
  }
  return res;
}

console.log(555, findMaximumGreatness([1, 1, 1, 1, 2]));
