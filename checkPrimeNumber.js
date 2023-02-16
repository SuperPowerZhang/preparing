// 1、摆烂，用 2=》n-1

function checkPrimeNumber1(num) {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

// 2、sqrt
function checkPrimeNumber2(num) {
  const help = Math.sqrt(num);
  for (let i = 2; i <= help; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

// 3、找规律
// 关于质数分布的规律：大于等于5的质数一定和6的倍数相邻
function checkPrimeNumber3(num) {
  if (num == 2 || num == 3) return true;
  //不在6的倍数两侧的一定不是质数
  if (num % 6 != 1 && num % 6 != 5) return false;
  const tmp = Math.sqrt(num);
  //在6的倍数两侧的也可能不是质数
  for (let i = 5; i <= tmp; i += 6) {
    if (num % i == 0 || num % (i + 2) == 0) return false;
  }
  //排除所有，剩余的是质数
  return true;
}

console.log(checkPrimeNumber1(4), checkPrimeNumber2(47), checkPrimeNumber3(18));
