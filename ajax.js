// axios

const ajax = (method, url, data, success, fail) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
        // 结果在xhr.responseText中
        success(xhr)
      } else {
        fail(xhr)
      }
    }
  }
  xhr.send(data);
}
const ajax2 = (method, url, data, timeout) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    let timer;
    xhr.open(method, url);
    xhr.onreadystatechange = () => {
      timer && clearInterval(timer);
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
          resolve(xhr.responseText)
        } else {
          reject(new Error(xhr.responseText))
        }
      }
    }
    xhr.send(data);
    if (timeout) {
      timer = setInterval(() => {
        xhr.abort();
        clearInterval(timer);
      }, timeout)
    }
  })
}

ajax2('GET',
  'https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/send',
  null,
  3000).then((res) => {
    console.log('success:', res);
  }, err => {
    console.log('fail:', err);
  })
