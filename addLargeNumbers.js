function addLargeNUmbers(a, b) {
  let len = a.length > b.length ? a.length : b.length;
  let stringA, stringB;
  //用0去补齐长度
  stringA = String(a).padStart(len, '0'); //"0009007199254740991"
  stringB = String(b).padStart(len, '0'); //"1234567899999999999"
  // if (a.length > b.length) {
  //   len = a.length;
  //   stringA = '' + a;
  //   stringB = new Array(len - b.length).fill('0').join('') + b;
  // } else {
  //   len = b.length;
  //   stringA = new Array(len - a.length).fill('0').join('') + a;
  //   stringB = '' + b;
  // }
  let pre = 0;
  let res = '';
  for (let i = len - 1; i >= 0; i--) {
    let temp = parseInt(stringA[i]) + parseInt(stringB[i]) + pre;
    pre = temp >= 10 ? 1 : 0;
    res = (temp >= 10 ? temp % 10 : temp) + res;
  }
  if (pre) res = String(pre) + res;
  return res;
}

let a = 9007199254740991;
let b = '1234567899999999999';

console.log(addLargeNUmbers(a, b));
