// String.prototype.trim()
// trim() 方法从字符串的两端清除空格，返回一个新的字符串，而不修改原始字符串

String.prototype.trim = function () {
  return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};

String.prototype.trim = function () {
  var str = this,
    whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
  for (var i = 0, len = str.length; i < len; i++) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      // 是空格的时候跳过去了，从第一个不是空格的时候开始截取字符串
      str = str.substring(i);
      break;
    }
  }
  for (i = str.length - 1; i >= 0; i--) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(0, i + 1);
      break;
    }
  }
  return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
};

let ss1 = new String('  sdd  ');
console.log(ss1.trim());
