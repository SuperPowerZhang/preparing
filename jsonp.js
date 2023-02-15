function jsonp(url, options) {
  const { timeout, callbackName } = options;
  return new Promise((resolve, reject) => {
    let time = null;
    window[callbackName] = function (data) {
      if (timeout) clearTimeout(time);
      resolve(data);
      // 很重要的性能优化点
      delete window[callbackName];
      document.body.removeChild(scriptNode);
    };

    const scriptNode = new HTMLScriptElement();
    scriptNode.src = `url?callback=${callbackName}`;
    document.body.appendChild(scriptNode);
    time = setTimeout(() => {
      reject('network err, timeout');
    }, timeout);
    // 失败
    scriptNode.onerror = function (err) {
      reject(err);
    };
  });
}

jsonp('http://localhost:9090/api', {
  callbackName: 'res1',
  // 超时处理
  timeout: 3000
})
  // 请求成功
  .then(res => {
    console.log('jsonp->', res);
  })
  // 请求失败
  .catch(err => {
    console.log('network err!');
  });

// 后端
const http = require('http');
const url = require('url');
http
  .createServer((req, res) => {
    // /api?callback=onResponse
    // 解析前端请求url中的callback名
    if (req.url.includes('/api')) {
      let myurl = url.parse(req.url);
      let params = new URLSearchParams(myurl.query);
      let posts = ['js', 'php'];
      let mathodName = params.get('callback');
      res.end(`${mathodName}(${JSON.stringify(posts)})`);
    }
  })
  .listen(9090, () => {
    console.log(9090);
  });
