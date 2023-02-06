// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
// 注意：给定 n 是一个正整数。
// 示例 1： 输入： 2 输出： 2 解释： 有两种方法可以爬到楼顶。
// 1 阶 + 1 阶
// 2 阶

// 示例 2： 输入： 3 输出： 3 解释： 有三种方法可以爬到楼顶。
// 1 阶 + 1 阶 + 1 阶
// 1 阶 + 2 阶
// 2 阶 + 1 阶

// 改为：一步一个台阶，两个台阶，三个台阶，.......，直到 m个台阶。问有多少种不同的方法可以爬到楼顶呢？


var climbStairs = function ( n ) {
  const dp = new Array( n + 1 ).fill( 0 );
  const m = 2;
  dp[0] = 1;
  // 先背包后物品
  for ( let i = 1; i <= n; i++ ) {
    for ( let j = 1; j <= m; j++ ) {
      if ( i >= j ) {
        dp[i] += dp[i - j];
      }
    }
  }
  return dp[n];
};